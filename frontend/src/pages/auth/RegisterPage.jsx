import { useState } from "react";
import { Link } from 'react-router-dom';
import images from "../../constants/images";
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isEightOrMoreCharacters = password.length >= 8;
  const hasUppercaseAndLowercase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);

  const getColor = (condition) => {
    return condition ? 'bg-black' : 'bg-gray-400';
  };



  const handleRegister = async (e) => {
    e.preventDefault();

    const emptyFields = [username, email, password].filter(field => field === '').length > 0;

    if (emptyFields) {
      Swal.fire({
        iconColor: "black",
        icon: "error",
        title: "Oops…",
        text: "Please fill in all required fields.",
        confirmButtonColor: "black"
      });
    } else {
      const userData = {
        nom: username,
        email,
        password
      };
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/signup', userData);

        if (response.data.token) {
          const user = response.data;
          localStorage.setItem('sessionToken', [response.data.token, user._id, user.role]);
          window.location.replace(`http://localhost:5173/liste-stages`);
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <section className="lg:flex lg:flex-row h-screen mx-5 lg:mx-10 justify-center gap-5 lg:gap-10 items-center font-poppins">
        <div className="hidden lg:flex lg:justify-center lg:items-center w-full lg:w-1/2 h-1/3 lg:h-full">
          <img src={images.RegisterImg} alt="Hero Img" className="object-contain" />
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
          {message && (
            <p className="bg-red-500 text-white mb-3 p-3 w-3/4 text-center">
              {message}
            </p>
          )}
          <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="head text-center">
              <h1 className="text-[32px] lg:text-[40px] font-extrabold mb-1">Create an account</h1>
              <p className="font-normal text-gray-500">Already have an account? <Link to='/login' className='underline'>Log in</Link></p>
            </div>
            <div className="form mt-5 w-full px-5 lg:w-3/4 lg:px-0">
              <form onSubmit={handleRegister}>
                <div className="username flex flex-col mb-6 lg:mb-8">
                  <label htmlFor="username" className="text-[#6B778C] mb-1 ml-1 lg:ml-4 font-medium">Full name</label>
                  <input type="text" name="username" className="border border-[#C4C4C4] text-gray-600 py-2 px-3 lg:px-4 rounded-lg outline-none" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="email flex flex-col mb-6 lg:mb-8">
                  <label htmlFor="email" className="text-[#6B778C] mb-1 ml-1 lg:ml-4 font-medium">Email</label>
                  <input type="email" name="email" className="border border-[#C4C4C4] text-gray-600 py-2 px-3 lg:px-4 rounded-lg outline-none" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="password flex flex-col mb-6 lg:mb-8">
                  <label htmlFor="password" className="text-[#6B778C] mb-1 ml-1 lg:ml-4 font-medium">Password</label>
                  <div className="flex justify-between px-3 lg:px-4 items-center rounded-lg border border-[#C4C4C4]">
                    <input type={showPassword ? "text" : "password"} name="password" className="text-gray-600 py-2 outline-none rounded-lg flex-1" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                    <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <div className="passwordConf flex flex-wrap gap-3 mt-3">
                    <div className='flex items-center gap-1'>
                      <div className={`check size-3 rounded-full ${getColor(isEightOrMoreCharacters)}`}></div>
                      <p className={`text-sm ${isEightOrMoreCharacters ? 'text-black' : 'text-gray-400'}`}>Use 8 or more characters</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <div className={`check size-3 rounded-full ${getColor(hasUppercaseAndLowercase)}`}></div>
                      <p className={`text-sm ${hasUppercaseAndLowercase ? 'text-black' : 'text-gray-400'}`}>One Uppercase and lowercase character</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <div className={`check size-3 rounded-full ${getColor(hasSpecialCharacter)}`}></div>
                      <p className={`text-sm ${hasSpecialCharacter ? 'text-black' : 'text-gray-400'}`}>One special character</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <div className={`check size-3 rounded-full ${getColor(hasNumber)}`}></div>
                      <p className={`text-sm ${hasNumber ? 'text-black' : 'text-gray-400'}`}>One number</p>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-2 bg-black text-white rounded-xl font-medium">Create an account</button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RegisterPage;
