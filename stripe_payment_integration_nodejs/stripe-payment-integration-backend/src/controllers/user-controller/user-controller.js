//user-controller.js
import userModal from "../../modals/user-modal/user-modal.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import credentials from "../../credentials/credentials.js";
import nodemailer from "nodemailer";
import Stripe from 'stripe';
//stripe key 
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY,
{apiVersion : '2026-08-26'}
)

// signUp controller/api
const signUp = async(req,res)=>{
    try{
    const isUserExist = await userModal.findOne({email : req.body.email})
    if(isUserExist){
        return res.status(400).send({
            status : false,
            message : 'user with this email exist already'
        })
    }
    // hasing password 
    const securePass = await bcrypt.hash(req?.body?.password,10);
    const userData = {...req?.body, password : securePass};
    console.log('users' , userData);

    const newUser = new userModal(userData);
    const saveUser = await newUser.save();
    if(saveUser){
        return res.status(200).send({
            status : true,
            message : 'new user saved successfully'
        })
    }
    }
    catch(error){
        console.log('Error while creating user',error);
        res.status(500).send({
            status: false,
            message : 'Error while creating new user in server'
        })
    }
}
//handleLogIn api 
const handleLogIn = async(req,res)=>{
    try{


const {email,password} = req?.body
if(!email && !password){
    return res.status(500).send({
        status : false,
        message : 'validation error'
    })
}

const isUserExist = await userModal.findOne({email : email})
if(!isUserExist){
    return res.status(401).send({
        status : false,
        message : 'user does not exist with this email'
    })
}

const checkPassword = await bcrypt.compare(password,isUserExist.password)
if(!checkPassword){
    return res.status(404).send({
        status : false,
        message : 'Invalid password'
    })
}


//Generating token: 
const token = jwt.sign({
    email : isUserExist.email
},
process.env.Jwt_token,
{
    expiresIn : '5h'

})
//200 
return res.status(200).send({
    status : true,
    message : 'you have logged In successfully',
    token : token
})

    }
    catch(error){
        console.log(`Error while logging In  ${error}`);
        return res.status(500).send({
            status : false,
            message : 'Error while Login'
        })
    }
}


//email verification part under is...
const handleEmailVerification = (req,res)=>{
  const {email} = req.body;
  
  try{
    const otp = Math.floor(Math.random() * 5000) + new Date().getTime();
    console.log(`my otp is ${otp}`)
    // the email sender for verification purpose
    const transporter = nodemailer.createTransport({
      service :'gmail',
      auth : {
        user: process.env.EMAIL, //the email from which we send an email for verification
        pass: process.env.PASSWORD
      }
    })

    //mailOptions 
    //receiver detailer
    const receiverDetails = {
      from : process.env.EMAIL,
      to : email,
      subject :"sending email for email verification",
      //  html: `<h1>Email sent successfully for verification and  Your OTP is: ${otp}</h1>`
      html : `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Verification Code</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fb; padding:40px 15px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:520px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#4f46e5; padding:30px 20px;">
              <h1 style="margin:0; color:#ffffff; font-size:26px;">
                Verify Your Account
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 35px; text-align:center;">

              <p style="margin:0 0 15px; font-size:16px; line-height:1.6;">
                Hello,
              </p>

              <p style="margin:0 0 30px; font-size:16px; line-height:1.6; color:#4b5563;">
                Use the verification code below to complete your request.
              </p>

              <!-- OTP -->
              <div style="
                display:inline-block;
                background:#f3f4ff;
                border:1px solid #e0e7ff;
                border-radius:12px;
                padding:18px 35px;
                margin-bottom:30px;
              ">
                <span style="
                  font-size:36px;
                  font-weight:bold;
                  letter-spacing:8px;
                  color:#4f46e5;
                ">
                  ${otp}
                </span>
              </div>

              <p style="margin:0 0 10px; font-size:14px; color:#6b7280;">
                This code will expire shortly.
              </p>

              <p style="margin:0; font-size:14px; line-height:1.6; color:#9ca3af;">
                If you didn't request this code, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 30px; background:#f9fafb; text-align:center;">
              <p style="margin:0; font-size:12px; color:#9ca3af;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
      
    }
    //now we send email
    const sendEmail = transporter.sendMail(receiverDetails,(error,info)=>{
      if(error){
        console.log("Error while sending email for verification....",error)
      }
      else{
        console.log('Email sent successfully ' + info.response)
        return res.status(200).send({
          status : true,
          message : 'Email sent successfully for verification'
        })
      }
    })
    // if(sendEmail){
    //   console.log('email sent successfully')
    //   return res.status(200).send({
    //     status : true,
    //     message :'Email sent successfully for verification purpose'
    //   })
    // }

  }
  catch(error){
    console.log('An error occured while sending email for verification....', error)
    return res.status(401).send({
      status : false,
      message : 'an error occured while sending email for verification puprpose'
    })

  }
}

// //stripe integration part 
// const handleCheckOut = async (req, res) => {
//     const { items } = req.body;
//     console.log('Items: ', items);

//     try {
//         const modifyData = items.map((item, index) => {
//             return {
//                 price_data: {
//                     currency: "usd",
//                     product_data: {
//                         name: item.productName,
//                         images: [item.productImage]
//                     },
//                     unit_amount: Math.round(item.productPrice * 100)
//                 },
//                 quantity: item.productQuantity
//             };
//         });

//         const paymentSession = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             line_items: modifyData,
//             success_url: "https://www.angeljackets.com/",
//             cancel_url: "https://www.google.com/"
//         });
//         console.log('Payment session: ', paymentSession);

//         if (paymentSession) {
//             return res.status(200).send({
//                 status: true,
//                 message: "Payment successfull",
//                 data: {
//                     sessionId: paymentSession.id,
//                     checkoutUrl: paymentSession.url
//                 }
//             });
//         };
//     }

//     catch (error) {
//         console.log('Something went wrong while payment integration:', error);
//     };
// };
// stripe integration part closed



//stripe real code with dynamic client url 

const handleCheckOut = async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).send({
            status: false,
            message: "No items provided for checkout"
        });
    }

    try {
        const modifyData = items.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.productName,
                        images: item.productImage ? [item.productImage] : []
                    },
                    unit_amount: Math.round(Number(item.productPrice) * 100)
                },
                quantity: Number(item.productQuantity) || 1
            };
        });

        const paymentSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: modifyData,
            success_url: `${process.env.CLIENT_URL}/order-success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`
        });

        return res.status(200).send({
            status: true,
            message: "Payment session created successfully",
            data: {
                sessionId: paymentSession.id,
                checkoutUrl: paymentSession.url
            }
        });
    }

    catch (error) {
        console.log('Something went wrong while payment integration:', error);
        return res.status(500).send({
            status: false,
            message: "Payment session could not be created",
            error: error.message
        });
    }
};

export {signUp ,handleLogIn,handleEmailVerification, handleCheckOut}













// import userModal from "../../modals/user-modal/user-modal.js";
// import bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';
// import credentials from "../../credentials/credentials.js";
// import nodemailer from "nodemailer";

// //nodemailer variable 

// // signUp controller/api
// const signUp = async(req,res)=>{
//     try{
//     const isUserExist = await userModal.findOne({email : req.body.email})
//     if(isUserExist){
//         return res.status(400).send({
//             status : false,
//             message : 'user with this email exist already'
//         })
//     }
//     // hasing password 
//     const securePass = await bcrypt.hash(req?.body?.password,10);
//     const userData = {...req?.body, password : securePass};
//     console.log('users' , userData);

//     const newUser = new userModal(userData);
//     const saveUser = await newUser.save();
//     if(saveUser){
//         return res.status(200).send({
//             status : true,
//             message : 'new user saved successfully'
//         })
//     }
//     }
//     catch(error){
//         console.log('Error while creating user',error);
//         res.status(500).send({
//             status: false,
//             message : 'Error while creating new user in server'
//         })
//     }
// }
// //handleLogIn api 
// const handleLogIn = async(req,res)=>{
//     try{


// const {email,password} = req?.body
// if(!email && !password){
//     return res.status(500).send({
//         status : false,
//         message : 'validation error'
//     })
// }

// const isUserExist = await userModal.findOne({email : email})
// if(!isUserExist){
//     return res.status(401).send({
//         status : false,
//         message : 'user does not exist with this email'
//     })
// }

// const checkPassword = await bcrypt.compare(password,isUserExist.password)
// if(!checkPassword){
//     return res.status(404).send({
//         status : false,
//         message : 'Invalid password'
//     })
// }


// //Generating token: 
// const token = jwt.sign({
//     email : isUserExist.email
// },
// process.env.Jwt_token,
// {
//     expiresIn : '5h'

// })
// //200 
// return res.status(200).send({
//     status : true,
//     message : 'you have logged In successfully',
//     token : token
// })

//     }
//     catch(error){
//         console.log(`Error while logging In  ${error}`);
//         return res.status(500).send({
//             status : false,
//             message : 'Error while Login'
//         })
//     }
// }

// //user verifying api we create here 
// // const userVerification = async (req,res)=>{
// //     const {email} = req.body;
// //     try{
// //         if(!email){
// //             return res.status(400).send({
// //         status : false,
// //         message : 'Email is required'
// //      })
// //         }
// //       //400
// //       const isUserExist = await userModal.findOne({email})
// //       if(!isUserExist){
// //         return res.status(401).send({
// //             status : false,
// //             message :'Account does not exist'
// //         })


       

// //     }
// //  //200
// //         const url = 'https://www.google.com.pk';
// //         const uid = isUserExist._id;
// //         // const newUrl = `${url}/${uid}`
// //         const isEmailSent = sendEmailToUser(email)
// //         console.log(`email sent status : ${isEmailSent}`)
// //         if(isEmailSent){
// //              return res.status(200).send({
// //             status : true,
// //             message : 'Email verified successfully kindly check your email and update yor password',
// //             // data : newUrl
// //         })

// //         }
       
// //     }
// //     catch(error){
// //      console.log('something went wrong while verifying user....',error);
// //      return res.status(500).send({
// //         status : false,
// //         message : 'something went wrong while verifying user'
// //      })
// //     }
// // }

// // //funciton for sending email to user 
// // const sendEmailToUser = (email)=>{
// //    console.log(`user email is ${email}`)
// //    let isMailSent = false;

// //    // Create a transporter  detail provider 
// // const transporter = nodemailer.createTransport({
// //   service :"gmail" ,
// //   auth: {
// //     user: process.env.EMAIL,
// //     pass: process.env.PASSWORD
// //   },
// // });
// // //receiver detailer
// // const receiverDetail = {
// //     email : email,
// //     message : 'Hi, welcome to smit'
// // }

// // transporter.sendMail(
// //     receiverDetail,
// //     (error)=>{
// //         if(!error){
// //             console.log('email sent successfully')
// //             isMailSent = true
// //         }
// //         else{
// //             console.log('something went wrong while sending an email to user for verification....',error)
// //         }
// //     }
// // )
// // }


// const handleSendEmail = async (req, res) => {
//     const { userEmail } = req?.body;
//     console.log('Email:', userEmail);

//     try {
//         const otp = Math.floor(Math.random() * 5000) + new Date().getTime();

//         // Provider email info...!
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD
//             }
//         });

//         // Receiver info...!
//         const receiverDetails = {
//             from: process.env.EMAIL,
//             to: userEmail,
//             subject: "Email Verification Process",
//             // text: 'Your OTP is 1234'
//             html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>Your Verification Code</title>
// </head>

// <body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">

//   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fb; padding:40px 15px;">
//     <tr>
//       <td align="center">

//         <table width="100%" cellpadding="0" cellspacing="0" border="0"
//           style="max-width:520px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">

//           <!-- Header -->
//           <tr>
//             <td align="center" style="background:#4f46e5; padding:30px 20px;">
//               <h1 style="margin:0; color:#ffffff; font-size:26px;">
//                 Verify Your Account
//               </h1>
//             </td>
//           </tr>

//           <!-- Content -->
//           <tr>
//             <td style="padding:40px 35px; text-align:center;">

//               <p style="margin:0 0 15px; font-size:16px; line-height:1.6;">
//                 Hello,
//               </p>

//               <p style="margin:0 0 30px; font-size:16px; line-height:1.6; color:#4b5563;">
//                 Use the verification code below to complete your request.
//               </p>

//               <!-- OTP -->
//               <div style="
//                 display:inline-block;
//                 background:#f3f4ff;
//                 border:1px solid #e0e7ff;
//                 border-radius:12px;
//                 padding:18px 35px;
//                 margin-bottom:30px;
//               ">
//                 <span style="
//                   font-size:36px;
//                   font-weight:bold;
//                   letter-spacing:8px;
//                   color:#4f46e5;
//                 ">
//                   ${otp}
//                 </span>
//               </div>

//               <p style="margin:0 0 10px; font-size:14px; color:#6b7280;">
//                 This code will expire shortly.
//               </p>

//               <p style="margin:0; font-size:14px; line-height:1.6; color:#9ca3af;">
//                 If you didn't request this code, you can safely ignore this email.
//               </p>

//             </td>
//           </tr>

//           <!-- Footer -->
//           <tr>
//             <td style="padding:20px 30px; background:#f9fafb; text-align:center;">
//               <p style="margin:0; font-size:12px; color:#9ca3af;">
//                 © ${new Date().getFullYear()} Your Company. All rights reserved.
//               </p>
//             </td>
//           </tr>

//         </table>

//       </td>
//     </tr>
//   </table>

// </body>
// </html>
// `
//         };

//         const sendEmail = transporter.sendMail(receiverDetails);
//         if (sendEmail) {
//             console.log('Email send successfully!');
//             return res.status(200).send({
//                 status: true,
//                 message: "Email send successfully"
//             });
//         };
//     }

//     catch (error) {
//         console.log('Err while sending email:', error);
//     };
// };


// export {signUp ,handleLogIn,handleSendEmail}