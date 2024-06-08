import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './backend/Firebase';
import Login from './components/Login';
import Chat from './components/Chat';
import Navbar from './components/layouts/Navbar';
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hello from './components/layouts/Hello';

const App = () => {
  const [user] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Menjalankan logika setelah user login
  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      
      {/* Menampilkan Hello hanya jika user belum login */}
      {!isLoggedIn && <Hello />}
      
      <div className='-mt-56'>
        {/* Menampilkan komponen Chat jika user sudah login, dan Login jika belum */}
        {user ? <Chat /> : <Login />}
      </div>
    </>
  );
};

export default App;
