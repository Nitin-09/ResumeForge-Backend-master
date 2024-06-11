var nodemailer = require('nodemailer');
require('dotenv').config()

const sendMail = (email,otp) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  var mailOptions = {
    from: 'nitingangwani982000@gmail.com',
    to: email,
    subject: 'Verify your account',
    html: `<div style="padding:10px;font-size:12px;color:#343377;font-family:Georgia, 'Times New Roman', Times, serif;"><p>Hello User,</p><p>Thank you for choosing Resume Builder. Use this OTP to complete your Sign Up procedure and verify your account on Resume Builder.</p><p>Remember, Never share this OTP with anyone.</p><span style="width:fit-content;margin:auto;background-color:#13123e;color:white;padding:7px;border-radius:15px;display:block;">${otp}</span><p>Regards,</p><p>Team Resume Builder</p></div>`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}
module.exports = sendMail;