import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Wallet,
  X,
  CheckCircle,
} from "lucide-react";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [toast, setToast] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = cart.length ? 5 : 0;
  const total = subtotal + shipping;

  // ✅ Handle Buy Now
  const handleBuyNow = () => {
    if (!paymentMethod) {
      setToast("⚠️ Please select a payment method first!");
      return;
    }
    clearCart();
    setShowPayment(false);
    setOrderSuccess(true);
    setToast(`✅ Order placed successfully using ${paymentMethod}!`);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen  from-amber-50 via-yellow-100 to-amber-200 py-12 px-6 relative">
      <h1 className="text-4xl font-bold text-amber-800 text-center mb-10">
        🛒 Your Shopping Cart
      </h1>

      {/* ✅ Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-6 right-6 bg-amber-700 text-white px-5 py-3 rounded-lg shadow-lg z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <ShoppingCart className="mx-auto text-amber-500" size={60} />
          <p className="text-gray-700 text-lg mt-4">Your cart is empty!</p>
          <button
            onClick={() => (window.location.href = "/product")}
            className="mt-4 bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition"
          >
            Back to Shop
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* 🧺 Cart items */}
          <div className="md:col-span-2 bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold text-amber-900">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-amber-200 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-amber-200 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-bold text-green-700">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💰 Summary */}
          <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-6 space-y-5">
            <h3 className="text-2xl font-bold text-amber-800 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </p>
              <hr />
              <p className="flex justify-between font-bold text-lg text-amber-900">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </p>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-amber-700 text-white px-4 py-3 rounded-lg mt-5 hover:bg-amber-800 transition flex items-center justify-center gap-2"
            >
              <CreditCard size={20} /> Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {/* 💳 Payment Popup */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
            >
              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center">
                Select Payment Method
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => setPaymentMethod("💵 Cash on Delivery")}
                  className={`w-full flex items-center gap-3 px-4 py-3 border rounded-lg ${
                    paymentMethod === "💵 Cash on Delivery"
                      ? "bg-amber-100 border-amber-400"
                      : "hover:bg-amber-50"
                  }`}
                >
                  <DollarSign /> Cash on Delivery
                </button>
                <button
                  onClick={() => setPaymentMethod("💳 Credit / Debit Card")}
                  className={`w-full flex items-center gap-3 px-4 py-3 border rounded-lg ${
                    paymentMethod === "💳 Credit / Debit Card"
                      ? "bg-amber-100 border-amber-400"
                      : "hover:bg-amber-50"
                  }`}
                >
                  <CreditCard /> Credit / Debit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("📱 E-Wallet / Online Pay")}
                  className={`w-full flex items-center gap-3 px-4 py-3 border rounded-lg ${
                    paymentMethod === "📱 E-Wallet / Online Pay"
                      ? "bg-amber-100 border-amber-400"
                      : "hover:bg-amber-50"
                  }`}
                >
                  <Wallet /> E-Wallet / Online Pay
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="mt-6 w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition font-semibold"
              >
                Buy Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Order Success Popup */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-xl z-50"
          >
            <CheckCircle size={20} /> Order Placed Successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cart;
