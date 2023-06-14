const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = {
  sendVerificationEmail: async (senderAddress, link) => {
    let error = false;
    const unsubscribeLink = 'https://yourapp.com/unsubscribe'; // Replace with your actual unsubscribe link

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: senderAddress,
        subject: "Account Verification",
        html: `<div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5;">
        <h2 style="color: #333333; margin-bottom: 20px;">Welcome to TeleObGyn</h2>
        <p style="margin-bottom: 20px;">Dear User,</p>
        <p style="margin-bottom: 20px;">Thank you for signing up to TeleObGyn! To verify your account, please click the following verification link:</p>
        <div style="background-color: #f2f2f2; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          <a style="font-size: 16px; color: #333333;" href="${link}">Confirmation Link</a>
        </div>
        <p style="margin-bottom: 20px;">If you did not sign up for an account, please ignore this email.</p>
        <p style="font-size: 14px; color: #888888; margin-bottom: 5px;">This email was sent by TeleObGyn. Please do not reply to this email.</p>
        <p style="font-size: 14px; color: #888888; margin-bottom: 20px;">To unsubscribe from future emails, <a href="${unsubscribeLink}" target="_blank" style="color: #888888; text-decoration: none;">click here</a>.</p>
        <p style="font-size: 12px; color: #888888;">TeleObGyn - 2445 Rodriguez St., Tondo Manila, Philippines</p>
      </div>`,
      });
    } catch (error) {
      error = true;
    }
    return error;
  },

  sendForgotPasswordEmail: async (senderAddress, link) => {
    let error = false;
  
    const unsubscribeLink = 'https://yourapp.com/unsubscribe'; // Replace with your actual unsubscribe link
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: senderAddress,
        subject: "Reset Password",
        html: `<div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5;">
        <h2 style="color: #333333; margin-bottom: 20px;">Want to Reset your Password?</h2>
        <p style="margin-bottom: 20px;">Dear User,</p>
        <p style="margin-bottom: 20px;">Forgot your password or want to change it? To reset your password, please click the following verification link:</p>
        <div style="background-color: #f2f2f2; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          <a style="font-size: 16px; color: #333333;" href="${link}">Reset Link</a>
        </div>
        <p style="margin-bottom: 20px;">If you did not sign up for an account, please ignore this email.</p>
        <p style="font-size: 14px; color: #888888; margin-bottom: 5px;">This email was sent by TeleObGyn. Please do not reply to this email.</p>
        <p style="font-size: 14px; color: #888888; margin-bottom: 20px;">To unsubscribe from future emails, <a href="${unsubscribeLink}" target="_blank" style="color: #888888; text-decoration: none;">click here</a>.</p>
        <p style="font-size: 12px; color: #888888;">TeleObGyn - 2445 Rodriguez St., Tondo Manila, Philippines</p>
      </div>`,
      });
    } catch (error) {
      error = true;
    }
    return error;
  },
};
