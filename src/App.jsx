// src/App.js
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './backend/Firebase';
import Login from './components/Login';
import Chat from './components/Chat';
import Navbar from './components/layouts/Navbar';
import  "./App.css";
import { TypeAnimation } from 'react-type-animation';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className='mt-20 mx-auto w-80'>
    <TypeAnimation
    className='text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500'
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Silahkan Login Dahulu',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'untuk melanjutkan ke halaman chat',
        1000,
       
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
    </div>
    <div className='-mt-56'>
      {user ? <Chat /> : <Login />}
    </div>
    </>
  );
};

export default App;
