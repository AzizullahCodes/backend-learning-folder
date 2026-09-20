import nodemailer from "nodemailer";
import { config } from "dotenv";

const handleEmailVerification = async (email, token) => {
  try {
    const otp = Math.floor(Math.random() * 5000) + new Date().getTime();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    const receiverDetails = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "reset password otp",
      html: `<a href='http://localhost:5173/resetPassword?token=${token}'>Reset Password</a>`
    };

    const info = await transporter.sendMail(receiverDetails);
    console.log('Email sent successfully ' + info.response);
    return true;

  } catch (error) {
    console.log('An error occurred while sending email for verification...', error);
    throw error; // taaki forgotPassword ka catch block ye pakad sake
  }
};

// NEW: OTP email
const sendOtpEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset OTP",
    text: `Your OTP is ${otp}. It is valid for 10 minutes. Do not share it with anyone.`,
  });
};

export default handleEmailVerification;
export { sendOtpEmail };