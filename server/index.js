const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyparser = require('body-parser')
const port = 8080
const mongoose = require('mongoose')
const UserSchema = require('./modal/Usermodal')
const { error } = require('console')

mongoose.connect('mongodb://127.0.0.1:27017/usersdbs')

app.use(cors())
app.use(bodyparser.json())

app.post('/login', async(req,res) =>{
    try {
        const {email , password} = req.body
        const login =  await UserSchema.findOne({email : email})
        .then(user  => {
            if(user){
                if(user.password  === password){
                    res.json('Login Successfully')
                }
                else{
                    res.json('Password Incorrect')
                }
            }else{
                res.json('Invalid Email')
            }
        })
        
    } catch (error) {
        
    }
})

app.post('/registers' , async(req,res) =>{
       
    try{
        const { email} = req.body;
        const existingUser = await UserSchema.findOne({email : email});
        
        if (existingUser) {
            return res.json({ message: 'Email is already registered' });
        }else{
            const data = req.body
            const registers = await UserSchema(data)
            res.json(registers)
            registers.save()
        }
    }catch(error){
        console.log(error)
    }
        
    
})

async function sendEmail({ email, OTP }) {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "gokulvijaykumarvp@gmail.com", 
                pass: "lpsh mpzl najg ndel", 
            },
        });

        const mailConfig = {
            from: 'gokulvijaykumarvp@gmail.com',
            to: email,
            subject: 'PASSWORD RECOVERY',
            html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>Password Recovery OTP</title>
                    </head>
                    <body>
                        <h1>Your OTP for Password Recovery: ${OTP}</h1>
                        <p>Please use this OTP to complete your password recovery process.</p>
                    </body>
                    </html>`,
        };

        transporter.sendMail(mailConfig , (error,info) =>{
            if(error){
                console.log(error)
            }else{
                console.log(`Email Sent : ${info.response}`)
            }
        });
        
        return { success: true, message: "Email sent successfully." };
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        return { success: false, message: "Failed to send email." };
    }
}


app.post('/send_otp_email', async (req, res) => {
    try {
        const { email, OTP } = req.body;
        const existingUser = await UserSchema.findOne({email : email});
        
        if (existingUser) {
            const result = await sendEmail({ email, OTP });
            res.json(result);    
        }else{
            return res.json({ message: 'Email is not registered' });
        }

        
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

app.put('/reset-password', async (req, res) => {
    const { email,  password , retypepassword} = req.body;
    try {
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordMatch = user.password === password;;
        if (isPasswordMatch) {
            return res.json({ error: 'You used this password recently. please choose a different one.' });
        }else{
            const updatedUser = await UserSchema.findOneAndUpdate({email},{ password: password , retypepassword:retypepassword}, { new: true } );
            console.log(updatedUser)
            updatedUser.save()
            res.json({ message: 'Password reset successfully' });
        }
    } catch (error) {
        console.log(error)
    }   

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});