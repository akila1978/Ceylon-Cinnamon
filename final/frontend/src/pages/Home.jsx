import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="from-amber-50 to-amber-100 min-h-screen py-12 px-6">
      <h1 className="text-amber-500 font-bold text-7xl text-center drop-shadow-lg mt-12 hover:text-amber-400">
        Welcome to Ceylon Cinnamon
      </h1>

      {/* Top Images */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <img
          src="/pic15.jpg"
          alt="Ceylon Cinnamon Stick"
          className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <img
          src="/pich.jpg"
          alt="Cinnamon Powder"
          className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <img
          src="/pict.jpg"
          alt="Cinnamon Tea"
          className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Intro Paragraph */}
      <div className="mt-12 flex justify-center">
        <div className="max-w-3xl bg-amber-100 border border-white/50 rounded-xl p-8 backdrop-blur-sm shadow-lg">
          <p className="text-lg leading-relaxed text-center font-semibold text-amber-900">
            🌿 Ceylon cinnamon is called the “true cinnamon” of the world. It grows mainly in Sri Lanka
            and is known for its sweet and delicate flavor. Unlike other types of cinnamon, Ceylon cinnamon
            has thin, soft layers and a light golden-brown color. It is loved for its taste and health
            benefits.
          </p>
        </div>
      </div>

      {/* Join as Farmer */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <Link to="/farmer-interface">
          <button className="relative inline-block px-8 py-4 font-bold text-white bg-amber-700 rounded-lg shadow-lg overflow-hidden group">
            <span className="absolute top-0 left-0 w-full h-full bg-amber-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Join as Farmer
            </span>
          </button>
        </Link>
      </div>

      {/* Cinnamon Farms Section */}
      <div className="mt-12 flex justify-center">
        <div className="max-w-4xl bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-amber-900 mb-4 text-center">
            Cinnamon Farms – A Sri Lankan Treasure
          </h2>
          <p className="text-lg text-amber-900 leading-relaxed text-center">
            🌿 Cinnamon farms are the heart of Sri Lanka’s agricultural heritage. These farms grow the famous
            Ceylon cinnamon, known for its delicate flavor and health benefits. Supporting farmers helps
            preserve traditional practices and strengthens local communities.
          </p>
        </div>
      </div>

      {/* ⭐ NEW ARRIVALS SECTION ⭐ */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-amber-700 mb-6">New Arrivals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img
              src="alba.jpg"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">New</span>
              <h3 className="text-lg font-semibold mt-2">Organic Cinnamon Sticks</h3>
              <p className="text-sm text-gray-500 mt-1">Fresh 2025 Batch</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-amber-700">$14.00</span>
                <Link to="/Product">
  <button className="inline-block px-5 py-2 bg-amber-600 text-white rounded-xl shadow-md hover:bg-amber-700 hover:shadow-lg transition-all duration-300">
    Visit Our Shop
  </button>
</Link>

              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img
              src="pic2.jpg"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">New</span>
              <h3 className="text-lg font-semibold mt-2">Ceylon Cinnamon Herbal Tea</h3>
              <p className="text-sm text-gray-500 mt-1">20 Tea Bags</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-amber-700">$9.50</span>
                <Link to="/Product">
  <button className="inline-block px-5 py-2 bg-amber-600 text-white rounded-xl shadow-md hover:bg-amber-700 hover:shadow-lg transition-all duration-300">
    Visit Our Shop
  </button>
</Link>

              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img
              src="pic3.jpg"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">New</span>
              <h3 className="text-lg font-semibold mt-2">Cinnamon Honey Fusion</h3>
              <p className="text-sm text-gray-500 mt-1">Pure Bee Honey + Cinnamon</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-amber-700">$11.00</span>
                <Link to="/Product">
  <button className="inline-block px-5 py-2 bg-amber-600 text-white rounded-xl shadow-md hover:bg-amber-700 hover:shadow-lg transition-all duration-300">
    Visit Our Shop
  </button>
</Link>

              </div>
            </div>
          </div>

          {/* Product 4 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img
              src="body.jpg"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">New</span>
              <h3 className="text-lg font-semibold mt-2">Cinnamon Body Oil</h3>
              <p className="text-sm text-gray-500 mt-1">Aromatherapy Blend</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-amber-700">$15.75</span>
                <Link to="/Product">
  <button className="inline-block px-5 py-2 bg-amber-600 text-white rounded-xl shadow-md hover:bg-amber-700 hover:shadow-lg transition-all duration-300">
    Visit Our Shop
  </button>
</Link>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="from-amber-50 to-amber-100 py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
          <h1 className="text-4xl font-bold text-amber-800 text-center mb-6">
            About Ceylon Cinnamon 🌿
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
            Known as the “true cinnamon,” Ceylon Cinnamon from Sri Lanka is valued worldwide for its
            unique aroma, health benefits, and premium quality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src="/pic15.jpg"
              alt="Ceylon Cinnamon"
              className="rounded-2xl shadow-lg"
            />

            <div>
              <h2 className="text-2xl font-semibold text-amber-900 mb-4">
                Why Ceylon Cinnamon?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>✔ 100% Natural & Organic</li>
                <li>✔ Rich in Antioxidants</li>
                <li>✔ Supports Digestion & Heart Health</li>
                <li>✔ Premium Export Quality 🌍</li>
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4 text-center">
              Our Mission & Vision
          </h2>
            <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
              We aim to promote Sri Lanka’s finest agricultural heritage by providing authentic Ceylon
              Cinnamon products to the world while supporting farmers.
            </p>
            <div className="bg-white max-w-3xl mx-auto p-8 rounded-2xl shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-amber-700">Contact Us</h2>
  <p className="text-gray-600 mb-6">
    Feel free to send us your questions. We reply within 24 hours!
  </p>

  <form className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Full Name"
        className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-amber-500"
      />

      <input
        type="email"
        placeholder="Email Address"
        className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-amber-500"
      />
    </div>

    <input
      type="text"
      placeholder="Subject"
      className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-amber-500"
    />

    <textarea
      rows="6"
      placeholder="Your Message..."
      className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-amber-500"
    ></textarea>

    <button
      type="submit"
      className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition w-full"
    >
      Send Message
    </button>
  </form>
</div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
