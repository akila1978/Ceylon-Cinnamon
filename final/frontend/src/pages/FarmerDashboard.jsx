// src/pages/FarmerDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaUserEdit } from "react-icons/fa";

function FarmerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Farmer";

  return (
    <div className="min-h-screen  from-amber-50 via-amber-100 to-amber-200 font-sans text-amber-900 flex flex-col">

      {/* Welcome Section */}
      <section className="p-8 flex flex-col gap-4">
        <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
          <h2 className="text-3xl font-bold mb-4 text-center">Welcome, {name}!</h2>
          <p className="text-amber-700 text-lg text-center">
            Manage your cinnamon products, view orders, and grow your business globally.
            Keep track of your stats and easily access management actions.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="p-8 flex flex-col gap-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-amber-800">Your Activity</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-amber-600 text-white rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <span className="text-4xl mb-2">📦</span>
            <h3 className="font-bold text-lg">Products</h3>
            <p className="text-lg mt-2">0</p>
          </div>
          <div className="flex-1 bg-amber-500 text-white rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <span className="text-4xl mb-2">🛒</span>
            <h3 className="font-bold text-lg">Orders</h3>
            <p className="text-lg mt-2">0</p>
          </div>
          <div className="flex-1 bg-amber-400 text-white rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <span className="text-4xl mb-2">💰</span>
            <h3 className="font-bold text-lg">Revenue</h3>
            <p className="text-lg mt-2">$0</p>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="p-8 flex flex-col gap-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-amber-800 text-center md:text-left">
          Manage Products & Profile
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">

          {/* Add Product */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center text-center hover:scale-105">
            <FaBoxOpen className="text-amber-600 text-5xl mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold mb-2">Add Product</h3>
            <p className="text-amber-700 mb-4">Upload new cinnamon products for sale.</p>
            <button
              onClick={() => navigate("/farmer/add-product")}
              className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 shadow-lg transition font-semibold"
            >
              Add
            </button>
          </div>

          {/* View Orders */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center text-center hover:scale-105">
            <FaClipboardList className="text-amber-600 text-5xl mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold mb-2">View Orders</h3>
            <p className="text-amber-700 mb-4">Track your current orders and their status.</p>
            <button
              onClick={() => navigate("/farmer/orders")}
              className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 shadow-lg transition font-semibold"
            >
              View
            </button>
          </div>

          {/* Update Profile */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center text-center hover:scale-105">
            <FaUserEdit className="text-amber-600 text-5xl mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold mb-2">Update Profile</h3>
            <p className="text-amber-700 mb-4">Edit your personal info, district, or cinnamon types.</p>
            <button
              onClick={() => navigate("/farmer/edit-profile")}
              className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 shadow-lg transition font-semibold"
            >
              Edit
            </button>
          </div>
        </div>
      </section>

      {/* Logout */}
      <div className="p-8 flex justify-center">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login", { state: { role: "farmer" } });
          }}
          className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-md font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default FarmerDashboard;
