import { useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../../constants/images';

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
  }

  return (
    <section className="flex h-screen justify-center gap-10 items-center font-poppins">
      <div className="flex justify-center items-center w-1/2 h-full bg-black">
        <img src={images.LoginImg} alt="Hero Img" />
      </div>
      <div className="w-1/2 h-full">
        <div className='flex flex-col justify-center items-center h-full w-full'>
          <div className="head text-center">
            <h1 className="text-[40px] text-center font-extrabold mb-1">Welcome back</h1>
            <p className="font-normal text-gray-500">Welcome back! Please enter your details.</p>
          </div>
          <div className="form mt-5 w-3/4">
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="email flex flex-col mb-8">
                <label htmlFor="email" className="text-[#6B778C] mb-1 ml-4 font-medium">Email</label>
                <input type="email" name="email" className="border border-[#C4C4C4] text-gray-600 py-2 px-4 rounded-lg outline-none" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="password flex flex-col mb-8">
                <label htmlFor="password" className="text-[#6B778C] mb-1 ml-4 font-medium">Password</label>
                <input type="password" name="password" className="border border-[#C4C4C4] text-gray-600 py-2 px-4 rounded-lg outline-none" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-full py-2 bg-black text-white rounded-xl font-medium">Login</button>
              <p className='text-center mt-4 font-medium'>Don't have an account? <Link to={'/register'} className='underline text-gray-500'>Sign up!</Link></p>
            </form>
          </div>
        </div>
      </div>

    </section>
  )
};

export default LoginPage
