import React from 'react'
import { Link } from 'react-router-dom' 
import { UseContext } from '../Mycontext/context'


const RegisterPage = () => {   
    const {handleRegister,registerData,handlechange,errors,dataMessage} = UseContext()
  

  return (
    <div className="main flex items-center justify-center w-full h-full">
        <div className="card rounded-md">
          <div className='h-full w-full px-9 py-12 flex flex-col justify-between'>
              <div className='w-full mt-2 mb-6 flex items-center'>
                  <h1 className='text-2xl mx-auto font-bold'>Register</h1>
              </div> 
              <form className="w-full pl-0" onSubmit={handleRegister}>
                  <div className='w-full mb-6 '>
                    <input type="text" name="fullname" value={registerData.fullname} onChange={handlechange}  className='w-full input-field' placeholder='Full Name' autocomplete="off" />
                    <span className='text-xs text-red-600'>{errors.fullname && <span>{errors.fullname}</span>}</span>
                  </div>
                  <div className='w-full mb-6'>
                    <input type="email" name='email' value={registerData.email} onChange={handlechange} className='w-full input-field' placeholder='Email' autocomplete="off"/>
                    <span className='text-xs text-red-600'>{errors.email && <span>{errors.email}</span>}</span>
                  </div>
                  <div className='w-full mb-6'>
                    <input type="password" name='password' value={registerData.password} onChange={handlechange} className='w-full input-field' placeholder='Password' autocomplete="off"/>
                    <span className='text-xs text-red-600'>{errors.password && <span>{errors.password}</span>}</span>
                  </div>
                  <div className='w-full mb-6'>
                    <input type="password" name='retypepassword' value={registerData.retypepassword} onChange={handlechange} className='w-full input-field' placeholder='Re-Type Password' autocomplete="off"/>
                    <span className=' text-xs text-red-600'> {errors.retypepassword && <span>{errors.retypepassword}</span>}</span>
                  </div>
                   {dataMessage.emailalreadytaken && <div className='w-full mb-6'><span className=' text-xs text-red-600'> <span>{dataMessage.emailalreadytaken}</span></span></div>}
                  <div>
                    <button type='submit' className='btn btnw btnclr'>Register</button>
                  </div>
              </form>
              <div className='w-full mt-4'>
                  <div className='flex items-center justify-center mb-2'>
                    <span className=' text-xs font-medium text-gray-500'>Already have account ? <Link to={'/'}><span className='link'>Sign In</span></Link></span>
                  </div>
              </div>  
          </div>
        </div>
    </div>
  )
}

export default RegisterPage