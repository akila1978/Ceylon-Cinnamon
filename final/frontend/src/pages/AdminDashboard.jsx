import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  Package,
  ShoppingBag,
  Settings,
  TrendingUp,
  Bell,
  LogOut,
  Moon,
  Sun,
  Search,
  FileText,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    alert("Admin logged out successfully!");
    navigate("/");
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 size={18} /> },
    { id: "users", label: "Users", icon: <Users size={18} /> },
    { id: "products", label: "Products", icon: <Package size={18} /> },
    { id: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
    { id: "activity", label: "Activity Log", icon: <Activity size={18} /> },
  ];

  const themeClass = darkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 text-gray-800";

  return (
    <div className={`min-h-screen flex transition ${themeClass}`}>
      {/* ✅ Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-64 ${
          darkMode ? "bg-gray-800" : "bg-white/80"
        } backdrop-blur-lg border-r border-white/20 shadow-xl flex flex-col justify-between p-6`}
      >
        <div>
          <h1 className="text-2xl font-extrabold mb-10 text-center text-amber-700">
            🌿 Ceylon Admin
          </h1>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-amber-600 text-white"
                    : darkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-amber-800 hover:bg-amber-100"
                }`}
              >
                {tab.icon} {tab.label}
              </motion.button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition justify-center mt-10"
        >
          <LogOut size={18} /> Logout
        </button>
      </motion.aside>

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Topbar */}
        <header
          className={`flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-30 ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white/80 backdrop-blur-xl"
          }`}
        >
          <div className="flex items-center gap-3">
            <Search size={18} className="text-amber-700" />
            <input
              type="text"
              placeholder="Search..."
              className={`border-none bg-transparent focus:outline-none ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            />
          </div>

          <div className="flex items-center gap-5">
            <Bell className="text-amber-700 cursor-pointer" size={22} />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin"
                className="w-10 h-10 rounded-full border-2 border-amber-600 cursor-pointer"
              />
            </div>
          </div>
        </header>

        {/* ✅ Page Content */}
        <main className="p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-amber-800 mb-8">
                  📊 Dashboard Overview
                </h2>

                {/* ✅ KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  {[
                    { title: "Total Sales", value: "$24,580" },
                    { title: "Active Users", value: "1,245" },
                    { title: "Orders Today", value: "48" },
                    { title: "Revenue This Month", value: "$12,870" },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className={`p-6 rounded-2xl shadow-lg ${
                        darkMode
                          ? "bg-gray-800 text-gray-200"
                          : "bg-white/80 backdrop-blur-lg text-gray-800"
                      }`}
                    >
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      <p className="text-3xl font-extrabold text-amber-700 mt-2">
                        {card.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* ✅ Recent Orders Section */}
                <div
                  className={`rounded-2xl p-6 shadow-md ${
                    darkMode ? "bg-gray-800 text-gray-100" : "bg-white/80"
                  }`}
                >
                  <h3 className="text-2xl font-semibold text-amber-800 mb-4">
                    🧾 Recent Orders
                  </h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr
                        className={`border-b ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        } text-amber-700`}
                      >
                        <th className="py-2">Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-amber-50 transition">
                        <td>#1024</td>
                        <td>Akila Sadun</td>
                        <td>Premium Cinnamon</td>
                        <td>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            Delivered
                          </span>
                        </td>
                        <td>$120</td>
                      </tr>
                      <tr className="hover:bg-amber-50 transition">
                        <td>#1025</td>
                        <td>Kasun Perera</td>
                        <td>Cinnamon Oil</td>
                        <td>
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                            Pending
                          </span>
                        </td>
                        <td>$80</td>
                      </tr>
                      <tr className="hover:bg-amber-50 transition">
                        <td>#1026</td>
                        <td>Nimali Fernando</td>
                        <td>Cinnamon Powder</td>
                        <td>
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                            Cancelled
                          </span>
                        </td>
                        <td>$45</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ✅ Placeholder panels for other sections */}
            {["users", "products", "orders", "analytics", "settings", "activity"].map(
              (id) =>
                activeTab === id && (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`p-6 rounded-2xl shadow-md ${
                      darkMode ? "bg-gray-800 text-gray-100" : "bg-white/80"
                    }`}
                  >
                    <h2 className="text-3xl font-bold text-amber-800 mb-4 capitalize">
                      {id.replace("-", " ")} Management
                    </h2>
                    <p className="text-gray-600">
                      This section will display {id} data, tables, and actions.
                      (Coming soon)
                    </p>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
