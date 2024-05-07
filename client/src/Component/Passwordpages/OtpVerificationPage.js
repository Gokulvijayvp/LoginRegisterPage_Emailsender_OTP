import React, { useEffect } from 'react'
import { UseContext } from '../../Mycontext/context'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

const OtpVerificationPage = () => {
    const {handleResetEmail,OTPinput,checkEmail, setOTPinput,disable,timerCount,resendOTP,setTimer,setDisable} = UseContext()
    useEffect(() => { 
        let interval = setInterval(() => {
          setTimer((lastTimerCount) => {
            lastTimerCount <= 1 && clearInterval(interval);
            if (lastTimerCount <= 1) setDisable(false);
            if (lastTimerCount <= 0) return lastTimerCount;
            return lastTimerCount - 1;
          });
        }, 1000); 
        return () => clearInterval(interval);
      }, [disable,setDisable,setTimer]);

  return (
    <div className="main flex items-center justify-center w-full h-full">
        <div className="card rounded-md">
            <div className='h-full w-full px-9 py-12 flex flex-col justify-between'>
                <div className='w-full'>
                    <div className='w-full mb-4 mt-2'>
                        <span className='text-xs font-bold'>Step 2</span>
                    </div>
                    <div className='w-full mt-2 flex items-center mb-2'>
                        <h1 className='text-2xl mx-auto font-bold'>OTP Verification</h1>
                    </div>
                    <div className='w-full  mb-8 mt-2 text-gray-500 '>
                        <div className='w-full flex justify-center  text-xs '> We send a code to  <span className='text-gray-950 font-bold ml-1'>{checkEmail}</span></div>
                    </div>
                </div>
                <form className='w-full' onSubmit={handleResetEmail}>
                    <div className='w-full'>
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs mt-10 mb-12">
                                <div className="w-16 h-16 ">
                                    <input
                                    maxLength="1"
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    type="text"
                                    name=""
                                    id=""
                                    onChange={(e) =>
                                        setOTPinput([
                                        e.target.value,
                                        OTPinput[1],
                                        OTPinput[2],
                                        OTPinput[3],
                                        ])
                                    }
                                    ></input>
                                </div>
                                <div className="w-16 h-16 ">
                                    <input
                                    maxLength="1"
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    type="text"
                                    name=""
                                    id=""
                                    onChange={(e) =>
                                        setOTPinput([
                                        OTPinput[0],
                                        e.target.value,
                                        OTPinput[2],
                                        OTPinput[3],
                                        ])
                                    }
                                    ></input>
                                </div>
                                <div className="w-16 h-16 ">
                                    <input
                                    maxLength="1"
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    type="text"
                                    name=""
                                    id=""
                                    onChange={(e) =>
                                        setOTPinput([
                                        OTPinput[0],
                                        OTPinput[1],
                                        e.target.value,
                                        OTPinput[3],
                                        ])
                                    }
                                    ></input>
                                </div>
                                <div className="w-16 h-16 ">
                                    <input maxLength="1"
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    type="text"name="" id=""
                                    onChange={(e) =>
                                        setOTPinput([
                                        OTPinput[0],
                                        OTPinput[1],
                                        OTPinput[2],
                                        e.target.value,
                                        ])
                                    }
                                    ></input>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className='mb-8'>
                                    <button type='submit' className='btn btnw btnclr'>Verify Account</button>
                                </div>
                                <div className="mb-4 flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                    
                                    <p>Didn't recieve code?</p>{" "}
                                    <div
                                    className="flex flex-row items-center"
                                    style={{
                                        color: disable ? "gray" : "blue",
                                        cursor: disable ? "none" : "pointer",
                                        textDecorationLine: disable ? "none" : "underline",
                                    }}
                                    onClick={() => resendOTP()}
                                    >
                                    {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                                    </div>
                                </div>
                                <div className='mb-4 flex items-center justify-center w-full text-xs font-medium text-gray-500'>
                                    <Link className='flex items-center justify-center ' to={"/"}> <FaArrowLeftLong className=' mr-2 '/><span>Back to log in</span></Link>
                                </div>
                            </div>
                            
                        </div>        
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default OtpVerificationPage