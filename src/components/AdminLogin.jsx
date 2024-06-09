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
    // e.preventDefault();
    navigate('/chat');

    if (email === 'admin' && password === 'admin') {
      try {
        await signInWithEmailAndPassword(auth, 'admin@example.com', 'adminpassword');
        onAdminLogin('admin@example.com');
        toast.success('Login berhasil!');
        navigate('/chat'); // Mengarahkan ke halaman chat setelah login
      } catch (error) {
        toast.error('Login gagal. Periksa email dan password Anda.');
        console.error('Error logging in: ', error);
      }
    } else {
      toast.error('Login gagal. Periksa email dan password Anda.');
    }
  };

  const handleBack = () => {
    navigate('/'); // Mengarahkan ke halaman awal
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
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
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
            
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
