import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

async function sendMail(to, subject, text, html = null) {
  // Buat transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: process.env.EMAIL_USER, // Ganti dengan email Anda
      pass: process.env.PASSWORD_USER // Ganti dengan password atau app password Anda
    }
  });

  // Siapkan opsi email
  let mailOptions = {
    from: 'Achmad Michael Owner Of Task Management App', // Ganti dengan nama dan email pengirim
    to: to,
    subject: subject,
    text: text
  };

  // Jika ada parameter html, maka tambahkan ke mailOptions
  if(html){
    mailOptions.html = html;
  }
  
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export default sendMail;