import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Update state if localStorage changes (optional if login happens elsewhere)
  useEffect(() => {
  const handleLoginStateChange = () => {
    console.log("Login state updated");
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  };

  window.addEventListener("local-storage-login", handleLoginStateChange);

  return () => {
    window.removeEventListener("local-storage-login", handleLoginStateChange);
  };
}, []);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false); // update state immediately
  };

  function SomeComponent() {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("./pages/UserProfile");
  };

  return <button onClick={goToProfile}>Go to Profile</button>;
}

  return (
    <nav className="bg-amber-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold text-amber-500">Ceylon Cinnamon</h1>

      <div className="space-x-4 font-bold flex items-center">
        <Link to="/" className="hover:text-amber-500">
          Home
        </Link>
        <Link to="/product" className="hover:text-amber-500">
          Product
        </Link>
        <Link to="/about" className="hover:text-amber-500">
          About
        </Link>

        {isLoggedIn ? (
          <>
          {JSON.parse(localStorage.getItem("user")).role=="user" ? (
 <Link
              to="/user-profile"
              className="bg-amber-400 text-white px-6 py-2 rounded-full hover:bg-green-400"
            >
              Profile
            </Link>

          ):( <Link
              to="/farmer-dashboard"
              className="bg-amber-400 text-white px-6 py-2 rounded-full hover:bg-green-400"
            >
              Profile
            </Link>) }
            <button
              onClick={handleLogout}
              className="bg-amber-400 text-white px-6 py-2 rounded-full hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-amber-400 text-white px-6 py-2 rounded-full"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-amber-400 text-white px-6 py-2 rounded-full"
            >
              Sign Up
            </Link>
          </>
        )}

        <Link to="/cart" className="relative">
          <span className="text-2xl">🛒</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            0
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
