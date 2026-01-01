import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const preselectedRole = location.state?.role || "user";
  const [role, setRole] = useState(preselectedRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let endpoint = "";
      if (role === "user") endpoint = "https://5a24bee9-460b-41f6-948a-ab78a2b8cead-00-3a3qn4n7m9ueq.sisko.replit.dev/api/user/login";
      if (role === "farmer") endpoint = "https://5a24bee9-460b-41f6-948a-ab78a2b8cead-00-3a3qn4n7m9ueq.sisko.replit.dev/api/farmer/login";

      let res = null;

      try {
        res = await axios.post(endpoint, { email, password });
      } catch (userOrFarmerError) {
        try {
          const adminRes = await axios.post("https://5a24bee9-460b-41f6-948a-ab78a2b8cead-00-3a3qn4n7m9ueq.sisko.replit.dev/api/admin/login", {
            email,
            password,
          });
          const admin = adminRes.data.admin;
          if (admin) {
            localStorage.setItem("user", JSON.stringify(admin));
            localStorage.setItem("isLoggedIn","true");
            alert("Admin login successful!");
            navigate("/admin-dashboard");
            return;
          }
        } catch {
          throw userOrFarmerError;
        }
      }

      const data = res?.data.user || res?.data.farmer || res?.data.admin;

      if (!data) {
        alert("Invalid login details!");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("isLoggedIn", "true");
window.dispatchEvent(new Event("local-storage-login"));
      //alert("Login successful!");

      if (data.role === "admin") navigate("/admin-dashboard");
      else if (data.role === "farmer") navigate("/farmer-dashboard");
      else navigate("/user-profile");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-amber-50 via-yellow-100 to-amber-200">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/40">
        <h1 className="text-4xl font-bold text-center text-amber-800 mb-6">🌿 Ceylon Cinnamon</h1>
        <p className="text-center text-gray-600 mb-6">Please login to your account.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!location.state?.role && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
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
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-green-500 cursor-not-allowed"
                : "bg-amber-700 text-white hover:bg-amber-800"
            }`}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            state={{ role }}
            className="text-amber-700 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
