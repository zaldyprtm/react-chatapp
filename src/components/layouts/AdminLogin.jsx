import React, { useState } from 'react';
import { auth } from '../../backend/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi email dan password
    if (email === 'admin' && password === 'admin') {
      try {
        await signInWithEmailAndPassword(auth, 'admin@example.com', 'adminpassword');
        onAdminLogin('admin@example.com');
        toast.success('Login berhasil!, Selamat Datang Admin!!');
        navigate('/chat');
      } catch (error) {
        toast.error('Login gagal. Periksa email dan password Anda.');
        console.error('Error logging in: ', error);
      }
    } else {
      toast.error('Login gagal. Periksa email dan password Anda.');
    }
  };

  const handleBack = () => { 
  navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 ">
      <div className="bg-slate-700 p-8 rounded-xl shadow-md w-full max-w-sm mx-auto mt-20 placeholder:text-white">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder='username'
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder='password'
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
          className='w-40 mx-auto flex items-center justify-center bg-sky-500 text-white p-2 rounded hover:bg-blue-600 mt-5'
          type='button'
          onClick={handleBack}
          >Kembali</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;