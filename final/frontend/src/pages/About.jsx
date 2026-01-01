import React from "react";

function About() {
  return (
    <div className=" from-amber-50 to-amber-100 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-amber-800 text-center mb-6">
          About Ceylon Cinnamon 🌿
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          Known as the “true cinnamon,” Ceylon Cinnamon from Sri Lanka is valued worldwide
          for its unique aroma, health benefits, and premium quality. Our mission is to
          bring the finest cinnamon products from Sri Lankan farmers directly to your home.
        </p>

        {/* 2 Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src="./public/pic15.jpg"
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

        {/* Mission & Vision */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4 text-center">
            Our Mission & Vision
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            We aim to promote Sri Lanka’s finest agricultural heritage by providing 
            authentic Ceylon Cinnamon products to customers worldwide. Our vision is 
            to be the most trusted global brand for cinnamon while supporting local 
            farmers and sustainable agriculture.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
