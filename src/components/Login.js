import React, { useState, useRef } from 'react'
import Header from './Header'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { validate } from '../utils/Helper';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
  //const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,setError] = useState(null)
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const handleSubmit = ()=>{
    const error = validate(email.current.value,password.current.value);
    setError(error);
    if(error) return;

    if(!isSignIn){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        updateProfile(auth.currentUser, {
          displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          // Profile updated!
          const {uid, email, displayName,photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
          navigate("/browse");
        }).catch((error) => {
          // An error occurred
          setError(error);
        });
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });

    }else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
    }

  }
  const [isSignIn,setIsSignIn] = useState(true);
  const toggleForm = ()=>{
    setIsSignIn(!isSignIn);
    setError(null);
    email.current.value = null;
    password.current.value = null;
  }
  return (
    <>
    <Header/>
    <div className='w-full h-screen p-12 flex items-center justify-center bg-gray-950 text-white relative'>
        
        <img className="absolute opacity-40 h-screen w-full" alt='baclground' src='https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_medium.jpg'/>
        <form onSubmit={(e)=>e.preventDefault()} className='my-14 bg-black flex flex-col align-center w-96 rounded-lg bg-opacity-60 absolute p-12'>
            <h1 className='font-bold text-2xl mb-2'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
            {
              !isSignIn && 
              <input className='py-2 px-3 my-4  bg-gray-800' 
              type="text" placeholder='Full Name'
              ref={name}
              />
            }
            <input 
            ref={email}
            className='py-2 px-3 my-4   bg-gray-800' 
            type="email" placeholder='Email'
            />
            <input  className='py-2 px-3 my-4  bg-gray-800' 
            ref={password}
            type="password" placeholder='Password'
            />
            <p className='text-red-700'>{error}</p>
            <button 
            onClick={handleSubmit}
            className='bg-red-600 p-2 my-4 rounded-lg 
            active:bg-red-750
            hover:bg-red-800
            '
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
            <hr/>
            <span className='p-2 my-4'>{isSignIn ? "Dont Have an Account? " : "Already Registered? "}<button onClick={()=>{toggleForm()}} className='mx-3 underline'>{isSignIn ? "Sign Up" : "Sign In"}</button></span>
        </form>
        
        
    </div>
    
    </>
  )
}

export default Login