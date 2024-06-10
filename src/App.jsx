import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./backend/Firebase";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import AdminLogin from "./components/layouts/AdminLogin";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hello from "./components/layouts/Hello";
import Footer from "./components/layouts/Footer";

const App = () => {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Menjalankan logika setelah user login
  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleAdminLogin = (admin) => {
    if (admin === "admin@example.com") {
      setIsLoggedIn(true);
    }
  };



  const loginAdmin = () => {
    window.location.href = "/admin";
  };

  return (
    <>
      <Router>
        <div>
          <Navbar />
        </div>
        <div className="mt-20">
          <ToastContainer />
        </div>

        {/* Menampilkan Hello hanya jika user belum login */}
        {!isLoggedIn && <Hello />}
        <div className="-mt-60">
          <Routes>
            <Route
              path="/admin"
              element={<AdminLogin onAdminLogin={handleAdminLogin} />}
            />
            <Route
              path="/chat"
              element={user || isLoggedIn ? <Chat /> : <Login />}
            />
            <Route path="/" element={user ? <Chat /> : <Login />} />
          </Routes>
          <div className="divider -mt-56 w-80 mx-auto">OR</div>
    {setAdmin && <button className="btn btn-circle btn-wide mx-auto mt-1 font-bold text-center flex items-center" onClick={loginAdmin}>Login Admin</button>}
      <div>
      </div>
          {!isLoggedIn ? <Footer /> : <div className="mx-auto mt-4 font-bold text-center">
            <span>MUZALPRA WEB-CHAT</span>
            </div>}
        </div>
      </Router>
    </>
  );
};

export default App;
