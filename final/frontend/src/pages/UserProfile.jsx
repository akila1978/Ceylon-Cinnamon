import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Crown,
  Settings,
  Activity,
  Edit3,
  Save,
  LogOut,
  Menu,
  X,
  Heart,
  CreditCard,
  Plus,
  ChevronDown,
} from "lucide-react";

function UserDashboard() {

  // Sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Active right section tab
  const [activeTab, setActiveTab] = useState("profile");

  // Profile edit mode
  const [isEditing, setIsEditing] = useState(false);

  // User info
  const userObject=JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({
    email: userObject.email,
    name: userObject.name
    
  });

  // Saved lists
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [payments, setPayments] = useState([]);

  // Settings dropdown
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const signupName = localStorage.getItem("signupFullName");
    const storedProfile = JSON.parse(localStorage.getItem("userProfile") || "null");
    const userObject=JSON.parse(localStorage.getItem("user"));
  console.log(userObject.role);
    if (signupName && !storedProfile) {
      setUser((u) => ({ ...u, name: signupName }));
      localStorage.setItem(
        "userProfile",
        JSON.stringify({ email: user.email, name: signupName, membership: user.membership })
      );
    } else if (storedProfile) {
      setUser(storedProfile);
    }

    setOrders(JSON.parse(localStorage.getItem("orders") || "[]"));
    setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
    setPayments(JSON.parse(localStorage.getItem("payments") || "[]"));
  }, []);

  // Persist changes
  useEffect(() => localStorage.setItem("orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("favorites", JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem("payments", JSON.stringify(payments)), [payments]);
  useEffect(() => localStorage.setItem("userProfile", JSON.stringify(user)), [user]);

  // Edit profile
  const handleEdit = () => setIsEditing(!isEditing);
  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  // Add order
  const handleBuy = (product) => {
    const newOrder = {
      id: Date.now() + Math.random(),
      product,
      purchasedAt: new Date().toISOString(),
    };
    setOrders((o) => [newOrder, ...o]);
  };

  // Toggle favorite
  const toggleFavorite = (product) => {
    const exists = favorites.find((f) => f.id === product.id);
    if (exists) setFavorites((f) => f.filter((x) => x.id !== product.id));
    else setFavorites((f) => [product, ...f]);
  };

  // Add payment method (fixed)
  const addPaymentMethod = (method) => {
    const newMethod = {
      id: Date.now() + Math.random(),
      label: method.label,
    };
    setPayments((p) => [newMethod, ...p]);
  };

  // Sample products
  const sampleProducts = [
    { id: "p1", title: "Ceylon Cinnamon - Small", price: 8.5 },
    { id: "p2", title: "Ceylon Tea - Premium", price: 12.0 },
    { id: "p3", title: "Handmade Basket", price: 20.0 },
  ];

  return (
    <div className="min-h-screen flex from-yellow-50 via-amber-100 to-amber-200">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-80 p-6 bg-amber-700 text-white flex flex-col shadow-lg">
        
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`}
            alt="avatar"
            className="w-16 h-16 rounded-full border-2 border-amber-300"
          />
          <div>
            <div className="text-lg font-bold">{user.name}</div>
            <div className="text-sm">{user.email}</div>
            <div className="mt-1 inline-flex items-center gap-2 bg-amber-600 px-2 py-1 rounded-full text-xs">
              <Crown size={14} /> {user.membership} Member
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold">MY ORDERS</h3>
          {orders.length === 0 ? (
            <p className="text-amber-200 mt-2 text-sm">No purchases yet.</p>
          ) : (
            <ul className="mt-2 space-y-2 max-h-40 overflow-auto">
              {orders.map((o) => (
                <li key={o.id} className="text-sm bg-white/10 px-3 py-2 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{o.product.title}</div>
                      <div className="text-xs">
                        {new Date(o.purchasedAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="font-semibold">${o.product.price}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Favorites */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold">FAVORITE ITEMS</h3>
          {favorites.length === 0 ? (
            <p className="text-amber-200 mt-2 text-sm">You haven't favorited any items.</p>
          ) : (
            <ul className="mt-2 space-y-2 max-h-40 overflow-auto">
              {favorites.map((f) => (
                <li
                  key={f.id}
                  className="text-sm bg-white/10 px-3 py-2 rounded-md flex justify-between"
                >
                  <div>
                    <div className="font-semibold">{f.title}</div>
                    <div className="text-xs">${f.price}</div>
                  </div>
                  <button onClick={() => toggleFavorite(f)}>
                    <Heart size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Payments */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold">PAYMENT METHODS</h3>

          {payments.length === 0 ? (
            <p className="text-amber-200 mt-2 text-sm">No payment methods added.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {payments.map((p) => (
                <li
                  key={p.id}
                  className="text-sm bg-white/10 px-3 py-2 rounded-md flex justify-between items-center"
                >
                  <div className="font-semibold">{p.label}</div>
                  <CreditCard size={16} />
                </li>
              ))}
            </ul>
          )}

          <AddPaymentForm onAdd={addPaymentMethod} />
        </div>

        {/* Logout */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="mx-auto block bg-white text-amber-800 px-6 py-2 rounded-full font-semibold hover:opacity-90"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Header */}
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 sticky top-0 z-20">
          <div className="w-24"></div>

          <h1 className="text-2xl font-bold text-amber-800">ACCOUNT</h1>

          <div className="relative">
            <button
              onClick={() => setSettingsOpen((s) => !s)}
              className="flex items-center gap-2 px-3 py-1 rounded-md border border-amber-200"
            >
              <Settings size={18} />
              <span className="hidden sm:inline-block text-amber-700">
                Settings
              </span>
              <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 z-30"
                >
                  <div className="font-semibold">Account Information</div>
                  <div className="text-sm mt-2 text-gray-600">
                    {user.name} • {user.email}
                  </div>

                  <div className="mt-3 border-t pt-3">
                    <button
                      onClick={() => setAddressOpen((s) => !s)}
                      className="w-full text-left py-2 flex justify-between items-center"
                    >
                      Address
                      <ChevronDown size={14} />
                    </button>
                    {addressOpen && (
                      <div className="text-sm text-gray-600">
                        No saved addresses.
                      </div>
                    )}

                    <button
                      onClick={() => setMessagesOpen((s) => !s)}
                      className="w-full text-left py-2 flex justify-between items-center"
                    >
                      Messages
                      <ChevronDown size={14} />
                    </button>
                    {messagesOpen && (
                      <div className="text-sm text-gray-600">No messages.</div>
                    )}

                    <button
                      onClick={() => setFeedbackOpen((s) => !s)}
                      className="w-full text-left py-2 flex justify-between items-center"
                    >
                      Feedback
                      <ChevronDown size={14} />
                    </button>
                    {feedbackOpen && (
                      <div className="text-sm text-gray-600">
                        Send feedback to support@example.com
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Main Layout */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Products */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">
                Products
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {sampleProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white p-4 rounded-xl shadow-md"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold">{p.title}</div>
                        <div className="text-sm text-gray-600">${p.price}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => toggleFavorite(p)}
                          className="p-2 rounded-full border"
                        >
                          <Heart size={18} />
                        </button>
                        <button
                          onClick={() => handleBuy(p)}
                          className="bg-amber-700 text-white px-3 py-1 rounded-md"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side Tabs */}
            <div>
              <AnimatePresence mode="wait">
                
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white p-6 rounded-2xl shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-amber-800">
                        Profile Information
                      </h3>
                      <button
                        onClick={handleEdit}
                        className="px-3 py-1 rounded-md border"
                      >
                        {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3">
                      <label className="text-sm font-semibold">Full name</label>
                      {isEditing ? (
                        <input
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="w-full border-b"
                        />
                      ) : (
                        <div className="text-gray-700">{user.name}</div>
                      )}

                      <label className="text-sm font-semibold mt-3">Email</label>
                      {isEditing ? (
                        <input
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="w-full border-b"
                        />
                      ) : (
                        <div className="text-gray-700">{user.email}</div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div
                    key="settings"
                    className="bg-white p-6 rounded-2xl shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-amber-800">
                      Account Settings
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Manage notifications, preferences and privacy.
                    </p>
                  </motion.div>
                )}

                {activeTab === "activity" && (
                  <motion.div
                    key="activity"
                    className="bg-white p-6 rounded-2xl shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-amber-800">
                      Recent Activity
                    </h3>
                    <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
                      <li>Logged in from Colombo - 2 hours ago</li>
                      <li>Updated profile information - yesterday</li>
                    </ul>
                  </motion.div>
                )}

                {activeTab === "favorites" && (
                  <motion.div
                    key="favorites"
                    className="bg-white p-6 rounded-2xl shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-amber-800">
                      Your Favorites
                    </h3>
                    {favorites.length === 0 ? (
                      <p className="text-gray-600 mt-2">
                        No favorite items yet.
                      </p>
                    ) : (
                      <ul className="mt-3 space-y-2">
                        {favorites.map((f) => (
                          <li
                            key={f.id}
                            className="flex justify-between items-center"
                          >
                            <div>
                              <div className="font-semibold">{f.title}</div>
                              <div className="text-sm text-gray-600">
                                ${f.price}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleBuy(f)}
                                className="bg-amber-700 text-white px-3 py-1 rounded-md"
                              >
                                Buy
                              </button>
                              <button
                                onClick={() => toggleFavorite(f)}
                                className="p-2 border rounded-md"
                              >
                                <Heart size={16} />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tab Nav */}
          <div className="mt-6 flex gap-3">
            {["profile", "settings", "activity", "favorites"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded ${
                  activeTab === tab
                    ? "bg-amber-700 text-white"
                    : "bg-white shadow"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function AddPaymentForm({ onAdd }) {
  const [label, setLabel] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!label.trim()) return;
    onAdd({ label });
    setLabel("");
  };

  return (
    <form onSubmit={handleAdd} className="mt-3 flex gap-2">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Card label (Visa ****1234)"
        className="w-full text-sm px-2 py-1 rounded-md text-amber-900"
      />
      <button
        type="submit"
        className="px-3 py-1 rounded-md bg-amber-600 text-white"
      >
        Add
      </button>
    </form>
  );
}

export default UserDashboard;
