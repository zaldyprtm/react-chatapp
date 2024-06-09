// src/components/Login.js
import React from 'react';
import { auth, provider } from '../backend/Firebase';
import { signInWithPopup } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch(alert);

    toast.success('Signing in...');
  };
const notify = () => toast.success('Sign in successful!');
  return (
    <>
    <div className="flex justify-center items-center h-screen">
      <button onClick={signInWithGoogle} className="bg-blue-500 text-white p-4 rounded">Sign in with Google</button>
    </div>
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
    </>
  );
};

export default Login;