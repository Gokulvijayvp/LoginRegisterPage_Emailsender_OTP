import { Link } from 'react-router-dom'
import { UseContext } from '../Mycontext/context'


const LoginPage = () => {

  const {chekUser,handleLogin,handleChanges,loginErr,loginerrors} = UseContext()
  return ( 
    <div className="main flex items-center justify-center w-full h-full">
        <div className="card rounded-md">
          <div className='h-full w-full px-9 py-12  flex flex-col justify-between'>
              <div className='w-full mt-2 mb-6 flex items-center'>
                  <h1 className='text-2xl mx-auto font-bold'>Login</h1>
              </div>
              <form className="w-full pl-0 " onSubmit={handleLogin}>
                <div className='w-full mb-6'>
                  <input type="email" name='email' autocomplete="off" value={chekUser.email} onChange={handleChanges} className='w-full mb-4 input-field' placeholder='Email' />
                  {loginerrors.email && <span className='text-xs text-red-600'> <span>{loginerrors.email}</span></span>} 
                </div>
                <div className='w-full mb-2'>
                  <input type="password" name='password' autocomplete="off"  value={chekUser.password} onChange={handleChanges} className='w-full mb-2 input-field' placeholder='Password'/>
                  {loginerrors.password && <span className=' text-xs text-red-600'> <span>{loginerrors.password}</span></span>}
                </div>
                  
                  {loginErr && <div className='text-xs mb-4 text-red-600'>
                      <span>{loginErr}</span>
                </div>}
                  <div>
                    <button type='submit' className='btn btnw btnclr'>Login</button>
                  </div>
              </form>
              <div className='mt-4 w-full text-xs font-medium text-gray-500'>
                  <div className='w-full mb-4 flex items-center justify-center'>
                    <span className=' '>Forgot <Link to={"/reset"}> <span className='link'>Password</span></Link>?</span>
                  </div>
                  <div className='w-full flex items-center justify-center'>
                  <span className=''>Don't have an account? <Link to={"/registerpage"}>  <span className='link'>Sign up</span></Link></span>
                  </div>
              </div>    
          </div>
        </div>
    </div>
  )
}

export default LoginPage