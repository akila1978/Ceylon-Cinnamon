// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Signup() {
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role || "user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [district, setDistrict] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      let endpoint = "";
      let payload = { name, email, password };

      if (role === "user") {
        endpoint = "http://localhost:3001/api/user/signup";
      } else if (role === "farmer") {
        endpoint = "http://localhost:3001/api/farmer/signup";
        payload.district = district;
      }

      const res = await axios.post(endpoint, payload);

      if (
        res.data.message === "User registered successfully!" ||
        res.data.message === "Farmer registered successfully!"
      ) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login", { state: { role } });
        }, 2000);
      } else {
        alert(res.data.message || "Signup failed!");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-amber-50 to-amber-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-amber-800 mb-6">
          Join Ceylon Cinnamon 🌿
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Create your New Account.
        </p>

        {success && (
          <div className="text-green-700 bg-green-100 p-3 mb-4 rounded-lg text-center font-medium">
            Signup Successful! Redirecting to Login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Register As
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {role === "farmer" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="Enter your district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Your Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-green-500 cursor-not-allowed"
                : "bg-amber-700 text-white hover:bg-amber-800"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ role }}
            className="text-amber-700 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
