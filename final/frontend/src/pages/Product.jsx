import React from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const categories = [
  {
    name: "🌿 Cinnamon Sticks",
    items: [
      { id: 1, name: "Cinnamon Sticks (Alba)", price: 12, description: "Alba is the highest quality grade of Ceylon cinnamon sticks, known for being very thin (around \(6-8\) mm in diameter, similar to a pencil) and having a light golden-brown color. This premium grade is prized for its exquisite, delicate flavor and aroma, making it the most expensive type of cinnamon available. Its ultra-thin and smooth texture is a hallmark of its superior quality, and it's often used to enhance both sweet and savory dishes, as well as drinks and teas. ", image: "/alba.jpg" },
      { id: 2, name: "Cinnamon Sticks(C5)", price: 10, description: "Ceylon cinnamon sticks of grade C5 are premium, slender quills from Sri Lanka that are golden-yellow with a diameter of approximately 10-12 mm. They are known for their smooth texture, delicate, sweet, and nuanced flavor, and are highly aromatic. C5 is the third highest grade in the Continental (C) scale, positioned after C5 Special and C4, making it a high-quality choice for both culinary use and wellness applications..", image: "/c5.jpg" },
      { id: 3, name: "Cinnamon Sticks (C4)", price: 9, description: "Ceylon cinnamon sticks of the C4 grade are a premium classification of true cinnamon (Cinnamomum verum) native to Sri Lanka, prized for their delicate flavor, high quality, and very low coumarin content. The C in the grade name stands for Continental, which is a classification category in the cinnamon trade.", image: "/c4.jpg" },

    ],
  },
  {
    name: "🌿 Cinnamon Products",
    items: [
      { id: 1, name: "Cinnamon Powder", price: 12, description: "Premium quills.", image: "/pic7.jpg" },
      { id: 2, name: "Cinnamon Tea", price: 10, description: "Small pieces for tea.", image: "/pic2.jpg" },
      { id: 3, name: "Cinnamon oil", price: 9, description: "Essential oil", image: "/body.jpg" },

    ],
  },

  
  // add other categories...
];

function Product() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white py-10 px-5">
      <h1 className="text-3xl font-bold text-center text-amber-800 mb-12">
        Our Ceylon Cinnamon Products
      </h1>

      {categories.map((category, idx) => (
        <div key={idx} className="mb-12">
          <h2 className="text-2xl font-semibold text-amber-900 mb-6">{category.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03 }}
                className="border rounded-2xl shadow-lg hover:shadow-2xl transition bg-amber-50"
              >
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-t-2xl" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-amber-900">{product.name}</h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="text-lg font-bold text-green-700 mt-3">${product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
