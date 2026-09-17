// // const nodemailer = require("nodemailer"); 
// import nodemailer from "nodemailer";
// import { config } from "dotenv";





// //email verification part under is...
// const handleEmailVerification = (req,res)=>{
//   const {email,token} = req.body;
  
//   try{
//     // const otp = Math.floor(Math.random() * 5000) + new Date().getTime();
//     // console.log(`my otp is ${otp}`)
//     // the email sender for verification purpose
//     const transporter = nodemailer.createTransport({
//       service :'gmail',
//       auth : {
//         user: process.env.EMAIL_USER, //the email from which we send an email for verification
//         pass: process.env.EMAIL_APP_PASSWORD
//       }
//     })

//     //mailOptions 
//     //receiver detailer
//     const receiverDetails = {
//       from : process.env.EMAIL_USER,
//       to : email,
//       subject :"reset password",
//       html : "<a href='http://localhost:5050/reset/password?token="+token+"'> reset password click here</a>"
//         // html: `<h1>Email sent successfully for verification and  Your OTP is: ${otp}</h1>`
     
      
//     }
//     //now we send email
//     const sendEmail = transporter.sendMail(receiverDetails,(error,info)=>{
//       if(error){
//         console.log("Error while sending email for verification....",error)
//       }
//       else{
//         console.log('Email sent successfully ' + info.response)
//         return res.status(200).send({
//           status : true,
//           message : 'Email sent successfully for verification'
//         })
//       }
//     })
   

//   }
//   catch(error){
//     console.log('An error occured while sending email for verification....', error)
//     return res.status(401).send({
//       status : false,
//       message : 'an error occured while sending email for verification puprpose'
//     })

//   }
// }

// export default handleEmailVerification


import nodemailer from "nodemailer";
 import { config } from "dotenv";


const handleEmailVerification = async (email, token) => {
  try {
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
      subject: "reset password",
html: `<a href='http://localhost:5173/resetPassword?token=${token}'>Reset Password</a>`
    //  html: "<a href='http://localhost:5050/reset/password?token=" + token + "'>reset password click here</a>"
    };

    const info = await transporter.sendMail(receiverDetails);
    console.log('Email sent successfully ' + info.response);
    return true;

  } catch (error) {
    console.log('An error occurred while sending email for verification...', error);
    throw error; // taaki forgotPassword ka catch block ye pakad sake
  }
};

export default handleEmailVerification;