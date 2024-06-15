import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaLinkedin, FaGithub } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import addUserToDB from '../utiles/addUserToDB';

const SignUp = () => {
    const {user, createUser, googleAuth, githubAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/";
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
    const onSubmit = async(data) => {
      const {email, password} = data;
      // console.log(email, password);
      await createUser({email, password}).then(result =>{
        if(result?.user){
          toast.success("Registered");
          navigate(from);
          addUserToDB(result);
        }
      }).catch(error => toast.error(error.message.replace("Firebase: ", "")))
    }

    const handleGoogleAuth = () =>{
      googleAuth().then(result =>{
        if(result?.user) {
          toast.success("Registered");
          navigate(from);
          addUserToDB(result);
        }
      })
    }

    const handleGithubAuth = () =>{
      githubAuth().then(result =>{
        if(result.user){
          toast.success("Registered");
          navigate(from);
        }
      })
    }
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-green-100">
      <Helmet>
        <title>Sign Up - Budget Buddy</title>
        <link rel="icon" href="/path/to/your/favicon.png" type="image/png" />
        <link rel="canonical" href="https://www.budgetbuddy.com/signup" />
      </Helmet>
      {/* Left Part */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-white order-2 lg:order-1">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-green-700 animate-slideInLeft">“Start where you are.</h2>
          <h2 className='text-2xl lg:text-4xl font-bold mb-4 text-green-700 animate-slideInLeft lg:ml-28'>Use what you have.</h2>
          <h2 className='text-2xl lg:text-4xl font-bold mb-4 text-green-700 animate-slideInLeft lg:ml-52'>Do what you can.”</h2>
          <p className="text-xl text-center text-gray-600 animate-slideInLeft delay-2000 lg:my-10">Take control of your finances today.</p>
        </div>
      </div>
      {/* Right Part */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 order-1 lg:order-2">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("email", {required: true})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("password", {required: true})}
                required
              />
            </div>
            <div className="mb-4">
              <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300">Sign Up</button>
            </div>
            {/* <input type="submit"/> */}
          </form>
          <div className="text-center text-gray-600 mb-4">Or sign up with</div>
          <div className="flex justify-center space-x-4">
            <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300" onClick={handleGoogleAuth}><FaGoogle /></button>
            <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"><FaLinkedin /></button>
            <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300" onClick={handleGithubAuth}><FaGithub /></button>
          </div>
          <div className="mt-4 text-center text-gray-600">
            Already have an account? <a href="/signin" className="text-green-500 hover:underline">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
