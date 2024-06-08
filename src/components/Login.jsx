// src/components/Login.js
import React from 'react';
import { auth, provider } from '../backend/Firebase';
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={signInWithGoogle} className="bg-blue-500 text-white p-4 rounded">Sign in with Google</button>
    </div>
  );
};

export default Login;
