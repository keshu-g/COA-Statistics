const nodemailer = require('nodemailer');
const constants = require('../constants');

const transporter = nodemailer.createTransport({
  host: constants.SMTP_HOST, 
  port: 587, 
  secure: false, 
  auth: {
    user: constants.SMTP_USER, 
    pass: constants.SMTP_PASS
  }
});

/**
 * Send an email using SMTP.
 *
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body text
 * @returns {Promise} - A promise that resolves with the response or rejects with an error
 */
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
      from: "COA System <kartikgoswami082@gmail.com>",
      to: to,
      subject: subject,
      text: text
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

module.exports = {
  sendEmail
};
