import React from "react";
import { Link } from "react-router-dom";

function FarmerInterface() {
  return (
    <div className="min-h-screen w-full  from-amber-50 via-amber-100 to-amber-200 text-amber-900 font-sans flex flex-col">

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col justify-evenly items-center text-center text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/farm-hero.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0  from-black/40 via-black/20 to-black/40"></div>

        {/* Content */}
        <div className="relative z-10 px-6 flex flex-col justify-evenly items-center h-full w-full">
          
          {/* Title */}
          <div>
            <h1 className="text-amber-900 text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-xl">
              Ceylon Cinnamon Farmers
            </h1>
            <p className="text-amber-800 mt-4 text-md md:text-lg lg:text-xl max-w-2xl mx-auto drop-shadow-md">
              Empowering Sri Lankan farmers to grow, connect, and sell pure Ceylon cinnamon globally.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              state={{ role: "farmer" }}
              className="px-8 py-3 bg-amber-600 rounded-xl hover:bg-amber-700 transition text-white font-semibold shadow-xl transform hover:scale-105"
            >
              Farmer Login
            </Link>

            <Link
              to="/signup"
              state={{ role: "farmer" }}
              className="px-8 py-3 bg-white text-amber-700 rounded-xl hover:bg-gray-100 transition font-semibold shadow-xl transform hover:scale-105"
            >
              Farmer Sign Up
            </Link>
          </div>


          <div class="max-w-6xl mx-auto px-6 py-12 bg-amber-50 rounded-2xl shadow-lg mt-12">
  <h2 class="text-3xl font-bold text-amber-700 text-center mb-8">
    Why Choose Our Website for Farmers?
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    
    <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 class="text-xl font-semibold text-amber-800 mb-3">Direct Market Access</h3>
      <p class="text-gray-700">
        Farmers can sell their high-quality Ceylon cinnamon products directly to customers, maximizing profits without middlemen.
      </p>
    </div>
  
    <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 class="text-xl font-semibold text-amber-800 mb-3">Fair Prices & Transparency</h3>
      <p class="text-gray-700">
        Our platform ensures fair pricing, real-time transactions, and complete transparency for farmers and buyers.
      </p>
    </div>

  
    <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 class="text-xl font-semibold text-amber-800 mb-3">Support & Guidance</h3>
      <p class="text-gray-700">
        Farmers receive professional guidance, resources, and tips to improve yield, quality, and business growth.
      </p>
    </div>
  </div>
</div>


        
          <div className="w-full max-w-6xl mx-auto text-center mt-10 grid sm:grid-cols-1 md:grid-cols-3 gap-6 px-4">
          
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl">🌱</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-amber-800">Empower Farmers</h3>
              <p>We connect local farmers with global buyers, ensuring fair trade and better income for their hard work.</p>
            </div>

          
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl">📦</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-amber-800">Sell Products Easily</h3>
              <p>Upload your cinnamon harvest directly to our marketplace and reach customers across the world.</p>
            </div>

          
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl">🌍</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-amber-800">Build Community</h3>
              <p>Learn sustainable techniques, share experiences, and grow together with other cinnamon farmers in Sri Lanka.</p>



              
            </div>
          </div>

          




        </div>
      </section>
    </div>



  );
}

export default FarmerInterface;
