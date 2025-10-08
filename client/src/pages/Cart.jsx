import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = Object.entries(cartItems).map(([id, qty]) => {
        const product = products.find((p) => p._id === id);
        return {
          _id: id,
          quantity: qty,
          price: product?.price || 0,
          name: product?.name || '',
          image: product?.image[0] || ''
        };
      });
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={" CART"} />
      </div>

      <div>
        {cartData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_2fr] items-center gap-4"
          >
            <div className="flex items-start gap-6">
              <img className="w-16 sm:w-20" src={item.image} alt={item.name} />
              <div>
                <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                <p className="mt-2">
                  {currency}{item.price}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) updateQuantity(item._id, val);
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={0}
                  value={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>

              {/* Buy Now button for individual item */}
              <button
                onClick={() => navigate("/place-order", { state: { items: [item] } })}
                className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 mt-2"
              >
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart total and checkout button for all items */}
      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal items={cartData} />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order", { state: { items: cartData } })}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
