<?php
/**
 * contact.php — Server-side contact form handler
 * Uses PHP's native mail() via the host's own mail server. No third-party
 * account or API key required.
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

$to      = 'dhiegopiresc@gmail.com';
$subject = "New message from {$name} — Cristofolini";

$headers   = [];
$headers[] = 'From: Cristofolini Contact Form <noreply@cristofolini.site>';
$headers[] = "Reply-To: {$name} <{$email}>";
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'MIME-Version: 1.0';

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Failed to send message. Please try again.']);
}
