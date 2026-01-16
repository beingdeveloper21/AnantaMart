import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken("");
    setCartItems({});
    setShowDropdown(false);
  };

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/collection", label: "COLLECTIONS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className="w-full bg-blue-500 text-white shadow-md">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-16 px-6 sm:px-10">
        
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={assets.logonew} className="h-10 w-auto" alt="Logo" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden sm:flex gap-8 text-sm">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className="flex flex-col items-center gap-1 hover:text-blue-100 group"
            >
              <p>{link.label}</p>
              <hr className="w-2/4 h-[2px] bg-blue-100 hidden group-hover:block border-none" />
            </NavLink>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5">
          
          {/* Profile */}
          <div className="relative">
            <img
              onClick={() => {
                if (!token) navigate("/login");
                else setShowDropdown((prev) => !prev);
              }}
              className="w-6 h-6 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
            />
            {token && showDropdown && (
              <div className="absolute right-0 mt-2 w-40 py-2 bg-blue-100 text-blue-900 rounded shadow-lg">
                <p className="px-4 py-1 cursor-pointer hover:text-blue-700">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="px-4 py-1 cursor-pointer hover:text-blue-700"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="px-4 py-1 cursor-pointer hover:text-blue-700"
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-6 h-6" alt="Cart" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] text-center bg-red-500 text-white rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-6 h-6 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-blue-500 text-white transition-all duration-300 overflow-hidden z-40 ${
          visible ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 p-4 cursor-pointer hover:bg-blue-400"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back"
            />
            <p>Back</p>
          </div>

          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              onClick={() => setVisible(false)}
              className="py-3 px-6 hover:bg-blue-400"
              to={link.path}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
