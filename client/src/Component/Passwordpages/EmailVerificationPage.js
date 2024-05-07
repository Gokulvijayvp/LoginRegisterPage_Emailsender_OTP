import React from 'react'
import { Link } from 'react-router-dom'
import { UseContext } from '../../Mycontext/context'
import { FaArrowLeftLong } from "react-icons/fa6";

const EmailVerificationPage = () => {
    const {checkEmail,setCheckEmail,handleCheckEmail,emailErr,dataMessage} = UseContext()
  return (
    <div className="main flex items-center justify-center w-full h-full">
        <div className="card rounded-md">
            <div className='h-full w-full px-9 py-12 flex flex-col justify-between'>
                <div className='w-full'>
                    <div className='w-full mb-4 mt-2'>
                        <span className='text-xs font-bold'>Step 1</span>
                    </div>
                    <div className='w-full mt-2 flex items-center mb-2  '>
                        <h1 className='text-2xl mx-auto font-bold'>Forgot password?</h1>
                    </div>
                    <div className='w-full flex justify-center mb-8 mt-2 text-gray-500 text-xs '>
                        <span>No worries,we'll send you reset instructions.</span>
                    </div>
                    <div className='w-full mb-3 font-bold'> 
                        <span className=''>Email</span>
                    </div>
                </div>
                <form className='w-full' onSubmit={handleCheckEmail}>
                <div className='w-full mb-8'>
                    <input type="email" value={checkEmail} autocomplete="off" onChange={(event) => setCheckEmail(event.target.value)} className='w-full mb-2 input-field' placeholder='Email' />
                    {emailErr.email && <span className='text-xs text-red-600'> <span>{emailErr.email}</span></span>}
                    {dataMessage.invalidemail && <span className='text-xs text-red-600'> <span>{dataMessage.invalidemail}</span></span>}
                </div>
                <div className='mb-8'>
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

export default EmailVerificationPage