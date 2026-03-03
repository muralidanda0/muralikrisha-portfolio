const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// ═══════════════════════════════════════════════════════════════
// CONFIGURE GMAIL TRANSPORTER
// ═══════════════════════════════════════════════════════════════

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ═══════════════════════════════════════════════════════════════
// GET /api/profile - Your existing profile endpoint
// ═══════════════════════════════════════════════════════════════

router.get("/", (req, res) => {
  res.json({
    name: "Murali Krishna Danda",
    tagline: "Aspiring Software Engineer | AI & Machine Learning Enthusiast",
    location: "Visakhapatnam, India",
    email: "muralidanda0@gmail.com",
    phone: "+91 9398196971",
    summary: [
      "Aspiring Software Engineer with a strong foundation in Data Structures & Algorithms and full-stack web development.",
      "Hands-on experience in AI/ML projects including computer vision and NLP-based systems.",
      "Reliance Foundation Scholar recognized for academic excellence, leadership, and initiative."
    ],
    highlights: [
      "Strong DSA & problem-solving skills",
      "Full-stack MERN development",
      "AI/ML & Computer Vision projects",
      "Reliance Foundation Scholar",
      "Internship experience in Web & ML"
    ]
  });
});

// ═══════════════════════════════════════════════════════════════
// POST /api/contact - Contact Form Endpoint (NEW)
// ═══════════════════════════════════════════════════════════════

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    const errors = {};

    if (!name || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!email || !email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }

    if (!subject || subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters';
    }

    if (!message || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: errors,
      });
    }

    // Email to admin (you)
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 3px solid #00d4ff; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
            <p>Reply to: ${email}</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Confirmation email to sender
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `We received your message - ${subject}`,
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00d4ff;">Thanks for reaching out, ${name}! 🚀</h2>
          
          <p style="color: #666; line-height: 1.6;">
            I've received your message about <strong>"${subject}"</strong> and will get back to you as soon as possible.
          </p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #999; margin: 0;">
              <strong>Message Summary:</strong><br/>
              ${message.substring(0, 150)}${message.length > 150 ? '...' : ''}
            </p>
          </div>

          <p style="color: #666; line-height: 1.6;">
            In the meantime, feel free to check out my portfolio, LinkedIn, or GitHub.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} Murali Krishna Danda
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(confirmationEmail),
    ]);

    console.log(`✅ Email sent successfully from: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
    });

  } catch (error) {
    console.error('❌ Email send error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again or contact me directly.',
    });
  }
});

module.exports = router;