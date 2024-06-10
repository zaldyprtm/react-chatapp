import React from 'react';
import { auth } from '../../backend/Firebase';
import { signOut } from "firebase/auth";
import toast, { ToastBar } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
       toast.success("Keluar", { duration: 2000 });
        navigate('/');
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        toast.error("Gagal keluar");
      });
  };

  const handleAdmin = () => {
    navigate('/admin'); // Mengarahkan ke halaman login admin
  };

  const handleMenu = () => {
    navigate('/'); // Mengarahkan ke halaman awal
  };

  const defaultPhotoURL = "https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck-thumbnail.png";

  return (
    <div className="navbar bg-base-100 top-0 sticky z-10 mb-28 shadow-xl">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500"
          onClick={handleMenu}
        >
          Chattan Kuys
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={auth.currentUser?.photoURL || defaultPhotoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {auth.currentUser ? (
              <>
                <li>
                  <a className="justify-between font-bold">
                    {auth.currentUser.displayName}
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </>
            ) : (
              <>
                <div className='mx-auto mt-2'>
                  Silahkan SignIn dahulu
                </div>
                <div className='mx-auto mt-2'>
                  <li>
                    <a onClick={handleAdmin}>
                      Admin
                    </a>
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
