const mongoose = require('mongoose');

const user = require('../model/users');

const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');

const secretKey = 'oejhgjpeoiuhfjhugykrjfkdsl;fkagyLKJFHGEIUGYVGEWIHUGHCJwiuyuftcweffdhgvhfhugh';

const emailAndotpMap=new Map();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deepakworkholics@gmail.com',
      pass: 'pmhx eogx zjnj iecd' // use App Password, not your Gmail password
    }
  });

exports.getWelcome = async (req,res)=>{

    const name="Deepak Varun";
    res.status(200).json(" Hello welcome to Powerlook Application ");
}

exports.requestForOTP = async (req,res)=>{
    const email = req.params.email;

    const otpC = Math.floor(100000 + Math.random() * 900000);

    console.log("Email--",email," OTP--",otpC);
    emailAndotpMap.set(email,otpC);

    const mailOptions = {
        from: 'deepakworkholics@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otpC}. It will expire in 5 minutes`
      };

      console.log("Check -111111" , mailOptions);

      try {
        await transporter.sendMail(mailOptions);

        console.log('OTP sent to email:', email);

        return res.status(200).json({
            message : "OTP Send To User Email SucessFull"
        })
        

      } catch (error) {

        console.error('Error sending email:', error.message);

        return res.status(500).json({
            message : "Internal Server Error"
        })
      }
}

exports.loginUserAndPassToken = async (req,res)=>{

    const body=req.body;
    const email = body.email;
    const otp=body.otp;

    const preOtp = emailAndotpMap.get(email);
    console.log(preOtp);

    if(otp==preOtp){

           const userDto = {
            email : email
           }
           const newUser = new user(userDto);
           
          await  newUser.save();

           const id=newUser._id;
           console.log(id);
           
        const token=generateToken(id);
        console.log(token);


         return res.status(200).json({
            message : "User Login SuccessFully",
            "token" : token
         });


    }else{
        return res.status(400).json({
            message : "Please Provide a correct email and otp"
        })
    }

}


const generateToken = (userId) => {

  const payload = { id: userId }
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  };

