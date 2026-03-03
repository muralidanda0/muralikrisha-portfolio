const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('\n✅ Testing Gmail credentials...\n');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error('❌ .env file missing EMAIL_USER or EMAIL_PASSWORD');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Invalid credentials:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Gmail verified! Sending test email...\n');
    
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      html: '<h2>✅ Email System Working!</h2>',
    }, (err) => {
      if (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
      }
      console.log('✅ TEST EMAIL SENT! Check your inbox.');
      process.exit(0);
    });
  }
});