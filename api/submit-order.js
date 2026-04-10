// Vercel Serverless Function - Order Form Handler
// Handles form submission, validation, and email notifications

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'digital.work.3442@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'peaxvalevxdpfohk'
  }
});

// Sanitize HTML special characters
function sanitizeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (basic)
function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

// Create HTML email template
function createEmailHTML(orderData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: linear-gradient(135deg, #1a4d2e, #2d7a52); color: white; padding: 20px; border-radius: 5px 5px 0 0; text-align: center; }
        .content { background: white; padding: 20px; border-radius: 0 0 5px 5px; }
        .order-item { background: #f0f0f0; padding: 15px; margin: 10px 0; border-left: 4px solid #1a4d2e; border-radius: 3px; }
        .label { font-weight: bold; color: #1a4d2e; }
        .value { color: #555; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #aaa; }
        .price-highlight { background: #e8f5e9; padding: 10px; border-radius: 3px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎉 नया ऑर्डर प्राप्त हुआ!</h2>
          <h2>New Order Received!</h2>
        </div>
        <div class="content">
          <h3>ऑर्डर विवरण / Order Details:</h3>
          
          <div class="order-item">
            <span class="label">नाम / Name:</span><br>
            <span class="value">${sanitizeHtml(orderData.fullName)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">Email:</span><br>
            <span class="value">${sanitizeHtml(orderData.email)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">फोन / Phone:</span><br>
            <span class="value">${sanitizeHtml(orderData.phone)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">पता / Address:</span><br>
            <span class="value">${sanitizeHtml(orderData.address)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">शहर / City:</span><br>
            <span class="value">${sanitizeHtml(orderData.city)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">राज्य / State:</span><br>
            <span class="value">${sanitizeHtml(orderData.state)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">पिन कोड / Pin Code:</span><br>
            <span class="value">${sanitizeHtml(orderData.pincode)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">मात्रा / Quantity:</span><br>
            <span class="value">${sanitizeHtml(orderData.quantity)}</span>
          </div>
          
          <div class="price-highlight">
            <span class="label">कुल कीमत / Total Price:</span><br>
            <span class="value" style="font-size: 18px; color: #1a4d2e;">${sanitizeHtml(orderData.totalPrice)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">भुगतान विधि / Payment Method:</span><br>
            <span class="value">${sanitizeHtml(orderData.paymentMethod)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">नोट्स / Notes:</span><br>
            <span class="value">${sanitizeHtml(orderData.notes) || 'कोई नहीं / None'}</span>
          </div>
          
          <div class="footer">
            <p>यह एक स्वचालित ईमेल है। कृपया इसका जवाब न दें।</p>
            <p>This is an automated email. Please do not reply.</p>
            <p>RN Herbal Stone-Go © 2026</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Create customer confirmation email
function createCustomerEmailHTML(orderData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: linear-gradient(135deg, #1a4d2e, #2d7a52); color: white; padding: 20px; border-radius: 5px 5px 0 0; text-align: center; }
        .content { background: white; padding: 20px; border-radius: 0 0 5px 5px; }
        .order-item { background: #f0f0f0; padding: 15px; margin: 10px 0; border-left: 4px solid #1a4d2e; border-radius: 3px; }
        .label { font-weight: bold; color: #1a4d2e; }
        .value { color: #555; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #aaa; }
        .success { background: #e8f5e9; padding: 15px; border-radius: 3px; color: #2e7d32; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>✅ आपका ऑर्डर स्वीकार किया गया!</h2>
          <h2>✅ Your Order Confirmed!</h2>
        </div>
        <div class="content">
          <div class="success">
            <strong>धन्यवाद आपकी खरीदारी के लिए। Thank you for your order!</strong>
          </div>
          
          <h3>आपके ऑर्डर की जानकारी / Your Order Details:</h3>
          
          <div class="order-item">
            <span class="label">नाम / Name:</span><br>
            <span class="value">${sanitizeHtml(orderData.fullName)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">मात्रा / Quantity:</span><br>
            <span class="value">${sanitizeHtml(orderData.quantity)} पैक / packs</span>
          </div>
          
          <div class="order-item">
            <span class="label">कुल कीमत / Total Price:</span><br>
            <span class="value" style="font-size: 18px; color: #1a4d2e;">${sanitizeHtml(orderData.totalPrice)}</span>
          </div>
          
          <div class="order-item">
            <span class="label">डिलीवरी पता / Delivery Address:</span><br>
            <span class="value">${sanitizeHtml(orderData.address)}, ${sanitizeHtml(orderData.city)}, ${sanitizeHtml(orderData.state)} ${sanitizeHtml(orderData.pincode)}</span>
          </div>
          
          <p style="margin-top: 20px; color: #666;">
            <strong>अगले कदम / Next Steps:</strong><br>
            हमारी टीम जल्द ही आपसे संपर्क करेगी। Our team will contact you shortly to confirm delivery details.
          </p>
          
          <div class="footer">
            <p>RN Herbal Stone-Go © 2026</p>
            <p>Contact: digital.work.3442@gmail.com || फोन / Phone: +977-9823456789</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Main handler function
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { fullName, email, phone, address, city, state, pincode, quantity, paymentMethod, notes, totalPrice } = req.body;

    // Validate required fields
    const requiredFields = { fullName, email, phone, address, city, state, pincode, quantity };
    const missingFields = Object.keys(requiredFields).filter(field => !requiredFields[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Required fields missing: ${missingFields.join(', ')}`
      });
    }

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Validate phone
    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number'
      });
    }

    // Prepare order data
    const orderData = {
      fullName: sanitizeHtml(fullName),
      email: sanitizeHtml(email),
      phone: sanitizeHtml(phone),
      address: sanitizeHtml(address),
      city: sanitizeHtml(city),
      state: sanitizeHtml(state),
      pincode: sanitizeHtml(pincode),
      quantity: sanitizeHtml(quantity),
      paymentMethod: sanitizeHtml(paymentMethod || 'COD'),
      notes: sanitizeHtml(notes),
      totalPrice: sanitizeHtml(totalPrice),
      timestamp: new Date().toISOString(),
      orderID: 'ORD-' + Date.now()
    };

    // Create email options for admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'digital.work.3442@gmail.com',
      to: process.env.ADMIN_EMAIL || 'digital.work.3442@gmail.com',
      subject: `🎉 नया ऑर्डर / New Order: ${orderData.orderID}`,
      html: createEmailHTML(orderData)
    };

    // Create email options for customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER || 'digital.work.3442@gmail.com',
      to: email,
      subject: `✅ ऑर्डर की पुष्टि / Order Confirmation: ${orderData.orderID}`,
      html: createCustomerEmailHTML(orderData)
    };

    // Send emails in parallel
    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(customerMailOptions)
      ]);
    } catch (emailError) {
      console.error('Email error:', emailError.message);
      // Don't fail the order if email fails, but log it
    }

    // Log order to console (for debugging)
    console.log('Order received:', orderData);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'ऑर्डर सफलतापूर्वक प्राप्त हुआ! / Order received successfully!',
      orderID: orderData.orderID,
      data: orderData
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};
