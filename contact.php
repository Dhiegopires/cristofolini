<?php
// Desativar a exibição de erros (Para não expor informações em produção)
error_reporting(0);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. CARREGAR A BIBLIOTECA PHPMailer
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';


// CONFIGURAÇÕES GERAIS E DESTINO
$sendTo = 'dhiegopiresc@gmail.com'; // ⬅️ SUBSTITUA PELO SEU EMAIL DE RECEBIMENTO
$okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!';
$errorMessage = 'There was an error while submitting the form. Please try to refresh your browser or try again later.';


// 2. CONFIGURAÇÕES SMTP (CREDENCIAIS DO GMAIL)
$smtpHost = 'smtp.gmail.com'; 
$smtpUsername = 'dhiegopiresc@gmail.com'; // ⬅️ SUBSTITUA PELO SEU EMAIL (O remetente)
$smtpPassword = 'qunx qjlw dzzz iyxx'; // ⬅️ SUBSTITUA PELA SENHA DE 16 DÍGITOS DO APP PASSWORD
$smtpPort = 465;
$smtpSecure = PHPMailer::ENCRYPTION_SMTPS; // 465 requer SMTPS (ssl)


// INÍCIO DO PROCESSO
$responseArray = [];

try {
    // 3. VALIDAÇÃO DOS CAMPOS (Do seu HTML)
    if ( !isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message']) ) {
        throw new Exception( 'Required fields are missing.' );
    }

    $name = $_POST['name'];
    $fromEmail = $_POST['email'];
    $messageBody = $_POST['message'];
    
    // 4. PREPARAR O PHPMailer
    $mail = new PHPMailer(true);

    // Configuração SMTP
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUsername;
    $mail->Password   = $smtpPassword;
    $mail->SMTPSecure = $smtpSecure; 
    $mail->Port       = $smtpPort;

    // Cabeçalhos do Email
    $mail->setFrom($smtpUsername, $name); 
    $mail->addAddress($sendTo);
    $mail->addReplyTo($fromEmail, $name); 

    // Conteúdo do Email
    $mail->isHTML(false); 
    $mail->Subject = 'SITE MAIL CRISTOFOLINI: ' . $name;
    
    // Estrutura do corpo do email
    $mail->Body    = "--- DETALHES DO CLIENTE ---\n" .
                     "Nome: " . $name . "\n" . 
                     "Email: " . $fromEmail . "\n" .
                     "---------------------------\n\n" .
                     "Mensagem:\n" . $messageBody;

    // 5. ENVIAR
    $mail->send();
    
    $responseArray = array('type' => 'success', 'message' => $okMessage);

} catch (Exception $e) {
    // 6. CAPTURAR ERROS SMTP 
    // Isso é útil para você durante o debug. Em produção, você pode ocultar a parte 'ErrorInfo'.
    $errorMessage = 'ERRO DE ENVIO SMTP: ' . $mail->ErrorInfo . ' ' . $errorMessage;
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}


// 7. RETORNAR RESPOSTA JSON PARA O FRONTEND
if ( ! empty( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && strtolower( $_SERVER['HTTP_X_REQUESTED_WITH'] ) == 'xmlhttprequest' ) {
    $encoded = json_encode( $responseArray );
    header( 'Content-Type: application/json' );
    echo $encoded;
} 
else {
    $encoded = json_encode( $responseArray );
    header( 'Content-Type: application/json' );
    echo $encoded;
}