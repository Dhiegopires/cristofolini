<?php
/**
 * contact.php — Server-side contact form handler
 * Sends via the Resend API instead of PHP's native mail(): mail() on shared
 * hosting sends through the host's own server, which rarely matches the
 * domain's SPF/DKIM, so it lands in spam. Resend uses its own authenticated
 * sending domain once cristofolini.site is verified in the Resend dashboard.
 */

error_reporting(0);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

if (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'XMLHttpRequest') {
    http_response_code(403);
    echo json_encode(['ok' => false, 'message' => 'Forbidden.']);
    exit;
}

$config = @include __DIR__ . '/../contact-config.php';
if (!is_array($config) || empty($config['resend_api_key'])) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Server not configured.']);
    exit;
}

// Read raw values, strip line breaks from header-bound fields to prevent injection
$name    = str_replace(["\r", "\n"], '', trim($_POST['name']  ?? ''));
$email   = str_replace(["\r", "\n"], '', trim($_POST['email'] ?? ''));
$message = trim($_POST['message'] ?? '');
$budget  = str_replace(["\r", "\n"], '', trim($_POST['budget'] ?? ''));

// Validate required fields
if (!$name || !$email || !$message) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Required fields are missing.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Invalid email address.']);
    exit;
}

$budget_line = $budget ? "\nBudget: {$budget}" : '';
$body = "New contact form submission\n\nName: {$name}\nEmail: {$email}{$budget_line}\n\nMessage:\n{$message}";

$payload = json_encode([
    'from'     => $config['from'] ?? 'Cristofolini <noreply@cristofolini.site>',
    'to'       => ['dhiegopiresc@gmail.com'],
    'reply_to' => "{$name} <{$email}>",
    'subject'  => "New message from {$name} — Cristofolini",
    'text'     => $body,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $config['resend_api_key'],
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => $payload,
]);
$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status >= 200 && $status < 300) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(502);
    echo json_encode(['ok' => false, 'message' => 'Failed to send message. Please try again.']);
}
