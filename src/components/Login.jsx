import React from 'react';
import { auth, provider } from '../backend/Firebase';
import { signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';


const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success(`Selamat datang, ${result.user.displayName}`, {
          duration: 3000
        });
        
    
        console.log(result.user.displayName);
      })
      .catch((error) => {
        toast.error("Gagal masuk");
        console.error("Error signing in: ", error);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <button onClick={signInWithGoogle} className="bg-blue-500 text-white p-4 rounded">Sign in with Google</button>
      </div>
      {/* <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div> */}
    </>
  );
};

export default Login;
