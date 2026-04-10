<?php
// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Set JSON response header
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only handle POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get form data
$data = json_decode(file_get_contents('php://input'), true);

// Fallback to $_POST if JSON was not sent
if (!$data) {
    $data = $_POST;
}

// Validate required fields
$required_fields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
$missing = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $missing[] = $field;
    }
}

if (!empty($missing)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Required fields are missing: ' . implode(', ', $missing)
    ]);
    exit();
}

// Sanitize inputs
$fullName = htmlspecialchars($data['fullName'] ?? '');
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($data['phone'] ?? '');
$address = htmlspecialchars($data['address'] ?? '');
$city = htmlspecialchars($data['city'] ?? '');
$state = htmlspecialchars($data['state'] ?? '');
$pincode = htmlspecialchars($data['pincode'] ?? '');
$quantity = htmlspecialchars($data['quantity'] ?? '1');
$paymentMethod = htmlspecialchars($data['paymentMethod'] ?? 'COD');
$notes = htmlspecialchars($data['notes'] ?? '');

// Calculate total price
$pricePerPack = 3999;
$totalPrice = $pricePerPack * (int)$quantity;
$orderDate = date('Y-m-d');
$orderTime = date('H:i:s');

// Email configuration
$adminEmail = 'digital.work.3442@gmail.com';
$recipientEmail = $email;

// Create admin email
$adminSubject = "🎯 New Order from {$fullName}";
$adminMessage = "
<html>
<head><style>
body { font-family: Arial, sans-serif; color: #333; }
.container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
.header { background: linear-gradient(135deg, #1a4d2e, #2d7a52); color: white; padding: 20px; border-radius: 8px; }
.section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #d4af37; }
.field { margin: 10px 0; }
.label { font-weight: bold; color: #1a4d2e; }
</style></head>
<body>
<div class='container'>
    <div class='header'>
        <h1>🎯 NEW ORDER RECEIVED</h1>
    </div>
    <div class='section'>
        <h3>👤 Customer Information</h3>
        <div class='field'><span class='label'>Name:</span> {$fullName}</div>
        <div class='field'><span class='label'>Email:</span> {$email}</div>
        <div class='field'><span class='label'>Phone:</span> {$phone}</div>
    </div>
    <div class='section'>
        <h3>📍 Delivery Address</h3>
        <p>{$address}<br>{$city}, {$state} {$pincode}</p>
    </div>
    <div class='section'>
        <h3>📦 Order Details</h3>
        <div class='field'><span class='label'>Product:</span> RN Stone Care Combo</div>
        <div class='field'><span class='label'>Quantity:</span> {$quantity} pack(s)</div>
        <div class='field'><span class='label'>Total Price:</span> ₹{$totalPrice}</div>
        <div class='field'><span class='label'>Payment Method:</span> {$paymentMethod}</div>
        <div class='field'><span class='label'>Date & Time:</span> {$orderDate} at {$orderTime}</div>
    </div>
</div>
</body>
</html>
";

// Create customer email
$customerSubject = "🎉 Order Confirmation - RN Stone Care Combo";
$customerMessage = "
<html>
<head><style>
body { font-family: Arial, sans-serif; color: #333; }
.container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
.header { background: linear-gradient(135deg, #1a4d2e, #2d7a52); color: white; padding: 20px; border-radius: 8px; }
.section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #d4af37; }
</style></head>
<body>
<div class='container'>
    <div class='header'>
        <h1>🎉 Order Confirmed!</h1>
    </div>
    <div class='section'>
        <h3>Hi {$fullName},</h3>
        <p>Your order has been received and is being processed!</p>
        <p><strong>Product:</strong> RN Stone Care Combo</p>
        <p><strong>Quantity:</strong> {$quantity} pack(s)</p>
        <p><strong>Total Amount:</strong> ₹{$totalPrice}</p>
        <p><strong>Payment Method:</strong> {$paymentMethod}</p>
    </div>
    <div class='section'>
        <h3>⚡ What Happens Next?</h3>
        <ul>
            <li>Our team will contact you via WhatsApp within 2 hours</li>
            <li>Order will ship within 24 hours</li>
            <li>You'll receive tracking details via SMS</li>
            <li>Delivery: 3-5 business days</li>
        </ul>
    </div>
    <div class='section'>
        <h3>💬 Need Help?</h3>
        <p>Email: digital.work.3442@gmail.com<br>WhatsApp: Available 24/7</p>
    </div>
</div>
</body>
</html>
";

// Set email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@rnherbal.com\r\n";

// Send emails
$adminSent = @mail($adminEmail, $adminSubject, $adminMessage, $headers);
$customerSent = @mail($recipientEmail, $customerSubject, $customerMessage, $headers);

// Log order
$logFile = 'orders.log';
$logEntry = "[" . date('Y-m-d H:i:s') . "] Order from {$fullName} ({$email}) - Qty: {$quantity} - Total: ₹{$totalPrice}\n";
@file_put_contents($logFile, $logEntry, FILE_APPEND);

// Return response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Order submitted successfully! Confirmation email has been sent.',
    'orderId' => 'ORD-' . time(),
    'customerEmail' => $email,
    'totalPrice' => $totalPrice
]);
exit();
?>
