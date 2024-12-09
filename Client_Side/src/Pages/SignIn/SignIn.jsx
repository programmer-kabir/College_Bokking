import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import useAuth from '../../Components/Hooks/useAuth';
// import { AuthContext } from '../../providers/AuthProvider';
// import { saveUser } from '../../components/SaveUser/SaveUser';

const SignIn = () => {
  const { singIn, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle google signin
  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        // saveUser(result.user);
        Swal.fire({
          position: 'top-middle',
          icon: 'success',
          title: 'Log in Successful',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.message);
        toast.error(err.message);
      });
  };

  const onSubmit = (data) => {
    setLoading(true);
    singIn(data.email, data.password)
      .then((result) => {
        // console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.message);
        toast.error(err.message);
      });
    // console.log(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-center items-center h-screen gap-x-10">
    <div className="py-36 pr-44">
      <iframe className="h-96 w-96" src="https://embed.lottiefiles.com/animation/124956"></iframe>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded px-8 pt-6 pb-8 shadow-md">
      <h2 className="text-2xl text-center text-gray-700 font-bold mb-8">Login Form</h2>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className={`w-full px-3 py-2 rounded border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-blue-500`}
        />
        {errors.email && <span role="alert" className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="relative mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <div  className={`w-full px-3 py-2 rounded border flex justify-between ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-blue-500`}>
          
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          {...register('password', { required: 'Password is required' })}
         className='outline-none'
        />
        <button
          type="button"
          className=" right-3 top-2.5 text-gray-500 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
        </div>
        {errors.password && <span role="alert" className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>

      <button type="submit" className="bg-rose-500 w-full rounded-md py-3 text-white">
      {loading ? <FaSpinner className="m-auto animate-spin" size={24} /> : 'Login'}
      </button>

      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        <p className="px-3 text-sm dark:text-gray-400">Signup with social accounts</p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
      </div>
      <div
        onClick={handleGoogleSignIn}
        className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
      >
        <FcGoogle size={32} />
        <p>Continue with Google</p>
      </div>
      <p className="px-6 text-sm text-center text-gray-400">
        Don't have an account?{' '}
        <Link to="/signup" className="hover:underline hover:text-rose-500 text-gray-600">
          Sign up Now
        </Link>
        .
      </p>
    </form>
  </div> 
  )
}

export default SignIn