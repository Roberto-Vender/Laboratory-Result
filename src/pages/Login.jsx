import React, { useState } from 'react';
import * as send from '../js/send.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      "email": email,
      "password": password
    }
    const response = await send.LoginAdmin(data);
    if (response.message.includes('success')) {
      localStorage.setItem('adminDetails', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome to the Clinic Management System.',
        confirmButtonColor: '#22c55e'
      }).then(() => {
        navigate('/Dashboard');
      });
    } else {
      setError(response.message);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: response.message,
        confirmButtonColor: '#22c55e'
      });
    }
  }

  return (
    <section className="bg-green-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 rounded-full p-4 mb-2 shadow">
            {/* Clinic/medical icon */}
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="white"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10m5-5H7" stroke="currentColor" strokeWidth="2.5"/>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-green-700 tracking-tight">Clinic Web System</h1>
          <p className="text-green-500 text-sm mt-1">Welcome! Please sign in to continue.</p>
        </div>
        <form className="w-full space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-green-900">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
              placeholder="name@clinic.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-green-900">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;