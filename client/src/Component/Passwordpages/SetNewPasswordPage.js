import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { UseContext } from '../../Mycontext/context';

const SetNewPasswordPage = () => {
    const {resetPassword,reasetPassData,navigate, changepassword,errors,checkEmail} = UseContext()
    useEffect(()=>{
        if(!checkEmail){
            navigate('/')
        }
    },[checkEmail,navigate])
  return (
    <div className="main flex items-center justify-center w-full h-full">
        <div className="card rounded-md">
            <div className='h-full w-full px-9 py-12 flex flex-col justify-between'>
                <div className='w-full'>
                    <div className='w-full mb-4 mt-2'>
                        <span className='text-xs font-bold'>Step 3</span>
                    </div>
                    <div className='w-full mt-2 flex items-center mb-2'>
                        <h1 className='text-2xl mx-auto font-bold'>Set new password</h1>
                    </div>
                    
                    <div className='w-full mb-4 mt-4 text-gray-500 text-xs '>
                        <div className='flex flex-col items-center '>Change the password for this mail <span className='text-gray-950 font-bold ml-1'>{checkEmail}</span></div>
                    </div>

                    <div className='w-full flex justify-center mb-8 mt-2 text-gray-500 text-xs '>
                        <span>Must be at least 8 characters</span>
                    </div>
                </div>
                <form className='w-full' onSubmit={resetPassword} >
                    <div className='w-full mb-6'>
                        <input type='password'  className='w-full mb-2 input-field' value={reasetPassData.password} name='password' onChange={changepassword}   placeholder='Password'/>
                        <span className='w-full text-xs text-red-600'>{errors.password && <span>{errors.password}</span>}</span>
                    </div>
                    <div className='w-full mb-6'>
                        <input type='password'  className='w-full mb-2 input-field' value={reasetPassData.retypepassword} name='retypepassword' onChange={changepassword}  placeholder='Confirm Password'/>
                        <span className='w-full text-xs text-red-600'> {errors.retypepassword && <span>{errors.retypepassword}</span>}</span>
                    </div>
                    <div className='w-full mb-8'>
                        <button type='submit' className='btn btnw btnclr'>Reset password</button>
                    </div>
                </form>
                <div className='mb-4 flex items-center justify-center w-full text-xs font-medium text-gray-500'>
                    <Link className='flex items-center justify-center ' to={"/"}> <FaArrowLeftLong className=' mr-2 '/><span>Back to log in</span></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SetNewPasswordPage