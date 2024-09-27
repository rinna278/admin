import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import signin from "../assets/logo.png";
import {toast} from 'react-toastify'
const LoginAdmin = () => {
  const [email, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/loginAdmin", {
        email,
        password,
      });
      navigate("/products");
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err)
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src={signin}
            alt="Login"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              email
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="email"
              placeholder="Nhập tên đăng nhập"
              value={email}
              onChange={(e) => setUseremail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              type="submit"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
