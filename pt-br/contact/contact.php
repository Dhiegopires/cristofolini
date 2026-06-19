<?php
/**
 * contact.php — Server-side contact form handler
 * Uses Resend API via cURL. No credentials ever reach the client.
 *
 * Setup: set RESEND_API_KEY as a server environment variable via your cPanel
 * "Environment Variables" tool, or add to .htaccess:
 *   SetEnv RESEND_API_KEY re_xxxxxxxxxxxx
 *
 * Production: once your domain is verified on Resend, change the 'from'
 * address below to something like: Contact Form <noreply@cristofolini.site>
 */

error_reporting(0);
header('Content-Type: application/json');

// Only accept POST from the site's own JS (not direct browser/curl requests)
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

// Read API key from environment — never hardcode
$api_key = getenv('RESEND_API_KEY');
if (!$api_key) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Mail service not configured.']);
    exit;
}

// Read raw values
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');
$budget  = trim($_POST['budget']  ?? '');

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

// Escape versions for HTML email body only
$name_h    = htmlspecialchars($name,    ENT_QUOTES, 'UTF-8');
$email_h   = htmlspecialchars($email,   ENT_QUOTES, 'UTF-8');
$message_h = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
$budget_h  = htmlspecialchars($budget,  ENT_QUOTES, 'UTF-8');

// Plain-text body — use raw values so no &amp; artifacts
$budget_line = $budget ? "\nBudget: {$budget}" : '';
$body_text = "New contact form submission\n\nName: {$name}\nEmail: {$email}{$budget_line}\n\nMessage:\n{$message}";

// HTML body — use escaped values
$body_html = "<p><strong>New contact form submission</strong></p>"
           . "<p><strong>Name:</strong> {$name_h}<br>"
           . "<strong>Email:</strong> {$email_h}"
           . ($budget_h ? "<br><strong>Budget:</strong> {$budget_h}" : '')
           . "</p>"
           . "<p><strong>Message:</strong><br>" . nl2br($message_h) . "</p>";

// Call Resend API
// TODO: change 'from' to a verified sender once domain is set up on Resend
// e.g. 'Contact Form <noreply@cristofolini.site>'
$payload = json_encode([
    'from'     => 'Contact Form <onboarding@resend.dev>',
    'to'       => ['dhiegopiresc@gmail.com'],
    'reply_to' => $email,
    'subject'  => "New message from {$name} — Cristofolini",
    'text'     => $body_text,
    'html'     => $body_html,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json',
    ],
    CURLOPT_TIMEOUT        => 15,
]);

$response  = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 200 || $http_code === 201) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Failed to send message. Please try again.']);
}
