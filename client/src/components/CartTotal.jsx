// CartTotal.jsx (for /cart)
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = ({ items = [], delivery_fee = 50 }) => {
  const { plusMember } = useContext(ShopContext);

  const rawSubtotal = items.reduce((sum, item) => {
    const price = item?.price || 0;
    const qty = item?.quantity || 0;
    return sum + price * qty;
  }, 0);

  const discount = plusMember && rawSubtotal > 999 ? rawSubtotal * 0.04 : 0;
  const subtotalAfterDiscount = rawSubtotal - discount;
  const finalTotal = subtotalAfterDiscount + delivery_fee;

  return (
    <div className="border p-4 rounded-md shadow-sm w-full">
      <h2 className="text-lg font-bold mb-2">Cart Summary</h2>
      <div className="flex justify-between">
        <p>Subtotal:</p>
        <p>₹{rawSubtotal.toFixed(2)}</p>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <p>Plus Member Discount (4%):</p>
          <p>-₹{discount.toFixed(2)}</p>
        </div>
      )}
      <div className="flex justify-between">
        <p>Shipping:</p>
        <p>₹{delivery_fee.toFixed(2)}</p>
      </div>
      <div className="flex justify-between font-bold mt-2">
        <p>Total:</p>
        <p>₹{finalTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartTotal;
