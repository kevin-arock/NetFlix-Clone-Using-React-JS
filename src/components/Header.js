import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
  const user = useSelector(appStore => appStore.user);
  const navigate = useNavigate();
  const handleClick = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className='absolute z-20 w-screen justify-between flex'>
      <img 
      className='w-40 p-5 mx-16'
      src="//images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460"  
      alt="Vector"
      />
    {user &&(
      <div className='flex mx-3 justify-between w-96 h-fit py-5 items-center'>
      <img src={user?.photoURL} alt='logo'/>
      <span>{user.displayName}</span>
      <button className='bg-slate-700 
      text-white h-2/5 py-3 px-5 
      rounded-lg mt-1 mx-2
      bg-opacity-85
      hover:bg-slate-900
      hover:bg-opacity-85
      font-semibold
      '
      onClick={handleClick}
      >
      Sign Out
      </button>
      </div>)
    }
    </div>
  )
}

export default Header

