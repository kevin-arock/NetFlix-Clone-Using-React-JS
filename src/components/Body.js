import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './Login';

import Browse from './Browse';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const router = createBrowserRouter([
      {
        path:"/",
        element:<Login/>
      },
      {
        path:"Browse",
        element:<Browse/>
      },
      
    ])
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const {uid, email, displayName,photoURL} = user;
                dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
            }else{
                dispatch(removeUser());
            }
        })
    },[])
  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}

export default Body