import React from 'react';
import { auth } from '../../backend/Firebase'; // Pastikan jalur impor sesuai dengan struktur proyek Anda
import { signOut } from "firebase/auth";

const Navbar = () => {
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const defaultPhotoURL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 14a4 4 0 100-8 4 4 0 000 8z'/%3E%3Cpath d='M23 22a1 1 0 01-1 1h-4a1 1 0 010-2h2.59l-3.3-3.3a8 8 0 10-11.31 0L2.41 15H5a1 1 0 010 2H1a1 1 0 01-1-1V8a1 1 0 011-1h4a1 1 0 010 2H2v6.59l3.3-3.3a8 8 0 0111.31 0L15 17.59V14a1 1 0 012 0v3.59l3.3-3.3a8 8 0 0111.31 0L23 18.41V21a1 1 0 01-1 1z'/%3E%3C/svg%3E";


  return (
    <div className="navbar bg-base-100 top-0 sticky z-10 mb-28">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">WEB-CHAT</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            {/* Add any icon or element inside this button if needed */}
          </div>
        </div>

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
            {/* Tampilkan nama pengguna dan tombol logout hanya jika pengguna sudah login */}
            {auth.currentUser ? (
              <>
                <li>
                  <a className="justify-between">
                    {auth.currentUser.displayName}
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </>
            ) : (
                <div>
                    Silahkan SignIn dahulu
                </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
