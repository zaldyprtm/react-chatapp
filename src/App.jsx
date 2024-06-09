import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './backend/Firebase';
import Login from './components/Login';
import Chat from './components/Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import AdminLogin from './components/layouts/AdminLogin';
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

  const handleAdminLogin = (admin) => {
    if (admin === 'admin@example.com') {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <Router>
        <div>
          <Navbar />
        </div>

        <ToastContainer />

        {/* Menampilkan Hello hanya jika user belum login */}
        {!isLoggedIn && <Hello />}

        <div className='-mt-56'>
          <Routes>
            <Route path="/admin" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
            <Route path="/chat" element={user || isLoggedIn ? <Chat /> : <Login />} />
            <Route path="/" element={user ? <Chat /> : <Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
