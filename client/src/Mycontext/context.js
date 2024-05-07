import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import * as Yup from 'yup'


const userContext = createContext('')

export function UseContext(){
    return useContext(userContext)
}

export default function UserProvider({children}){
    const [registerData, setRegisterData] = useState({
        fullname: '',
        email:'',
        password:'',
        retypepassword:''
    })

    const [errors, setErrors] = useState({})
    const [loginerrors, setLoginErrors] = useState({})
    const [loginErr, setLoginErr] =useState('')
    const navigate = useNavigate()
    const [chekUser, setCheckUser] = useState({
      email :'',
      password :'',
    })

    const [checkEmail,setCheckEmail] =useState('')
    const [emailErr, setEmailErr] = useState({})
    const [otp, setOTP] = useState();
    const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
    const [disable, setDisable] = useState(true);
    const [timerCount, setTimer] = useState(60);
    const [dataMessage, setDataMessage] = useState({})
    
    const initialReasetPassData = {
        password: '',
        retypepassword: ''
    };

    const [reasetPassData, setReasetPassData] = useState(initialReasetPassData)
    const client = Axios.create({
      baseURL: 'http://localhost:8080'
    })

    const handleChanges =(e) =>{
     const {name ,value} = e.target
     setCheckUser({...chekUser, [name] : value})
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().required('Email Required').email('Invalid email'),
        password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .required('Password required')
    });    

    const handleLogin = async(e) =>{
        e.preventDefault()
        try {
            await loginSchema.validate(chekUser ,{abortEarly:false})
            if (loginSchema) {
                const check = await client.post('/login', chekUser)
                if(check.data === 'Login Successfully'){
                    console.log("check sucessfully")
                    navigate('/home')
                }else{
                    setLoginErr(check.data)
                }    
            }
            
        } catch (error) {
            const newErrors = {}
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            })
            setLoginErrors(newErrors) 
        }
    }

    const validationSchema = Yup.object({
        fullname : Yup.string().required('Full name required'),
        email: Yup.string()
            .required('Email required')
            .email('Invalid email'),
        password : Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .required('Password required'),
        retypepassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Password must match')
            .required('Re-type password required')
    })
    
    const handleRegister = async(event) =>{
        event.preventDefault()
        try {
            await  validationSchema.validate(registerData, {abortEarly:false})   
            const response = await client.post('/registers', registerData);
            
            if(response.data.message  !== "Email is already registered") {
                navigate('/')    
            }else{
                setDataMessage({emailalreadytaken: response.data.message})
            }
        } catch (error) {
            const newErrors = {}
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                })
                setErrors(newErrors)
        }
    
    }
    
    const handlechange  =(event) =>{
        const {name ,value} = event.target
        setRegisterData( {...registerData, [name]: value})
    }

    

    const emailSchema= Yup.object({
        email: Yup.string().required('Email Required').email('Invalid email'),
    })

    

    const handleCheckEmail = async(e) =>{
        e.preventDefault()
        
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        console.log(OTP);
        setOTP(OTP);
        
        const checkEmails = {
            email: checkEmail,
            OTP,
        };

        try {
            await emailSchema.validate(checkEmails, {abortEarly:false})
            const checkemail = await client.post('/send_otp_email', checkEmails)
            const newError ={}
            console.log(checkemail.data)
            if(checkemail.data  === 'Invalid Username'){
                newError['email'] = checkemail.data
                setEmailErr(newError)
            }else if (checkemail.data.message === 'Email is not registered'){
                setDataMessage({invalidemail: checkemail.data.message})
            }else{
                navigate('/reset/otp')
            }
        } catch (error) {
            const newError ={}
            error.inner.forEach((err) =>{
                newError[err.path] = err.message
            })
            setEmailErr(newError)
        }
    }

    const handleResetEmail = (event) =>{
        event.preventDefault()
        if (parseInt(OTPinput.join("")) === otp) {
            navigate('/reset/setnewpassword')
            return;
          }
          alert(
            "The code you have entered is not correct, try again or re-send the link"
          );
          return;
    }

    
    const resendOTP = async() =>{
        if (disable) return;
        await client.post('/send_otp_email', {email: checkEmail,OTP: otp,})
        setDisable(true)
        alert("A new OTP has succesfully been sent to your email.")
        setTimer(60)
    }

    
    const resetSchema = Yup.object({
        email: Yup.string()
            .required('Email required')
            .email('Invalid email'),
        password : Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .required('Password required'),
        retypepassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Password must match')
            .required('Re-type password required')
    })

    const resetPassword = async(event)=>{
        event.preventDefault()
        const data ={
            email: checkEmail,
            password: reasetPassData.password, 
            retypepassword: reasetPassData.retypepassword,
        }
        try {
            await resetSchema.validate(data, {abortEarly:false})
            const resetpass = await client.put('/reset-password', data)
            
            if(resetpass.data.message === 'Password reset successfully'){
                navigate('/')
            }else{
                setErrors({password :resetpass.data.error})
            }

        } catch (error) {
            const newErrors = {}
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                })
                setErrors(newErrors)
        }
    }

    const changepassword =(event)=>{
        const {name ,value} = event.target
        setReasetPassData({...reasetPassData, [name]: value})
        setErrors({ ...errors, [name]: '' });
    }
    return(
        <userContext.Provider value={{navigate,dataMessage,resetPassword,reasetPassData, changepassword,setDisable,setTimer,resendOTP,timerCount,disable,OTPinput, setOTPinput,otp,handleResetEmail,emailErr,checkEmail,setCheckEmail,handleCheckEmail,loginerrors,loginErr,chekUser,handleLogin,handleChanges,handleRegister,registerData,handlechange,errors}}>
            {children}
        </userContext.Provider>
    )
} 