import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="w-full bg-blue-50 text-blue-900 mt-20">
      <div className="max-w-screen-xl mx-auto px-6 py-16 grid gap-12 sm:grid-cols-[2fr_1fr_1fr]">
        
        {/* Brand & Description */}
        <div className="flex flex-col gap-4">
          <img src={assets.logonew} alt="Logo" className="w-36 h-auto" />
          <p className="text-gray-700">
            Access quality products, competitive pricing, and dedicated business support. Shop smart and save big with AnantaMart.
          </p>
        </div>

        {/* Customer Support Links */}
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold">CUSTOMER SUPPORT</p>
          <ul className="flex flex-col gap-2 text-blue-700">
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Payment Methods</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Returns & Refunds</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Shipping Info</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-blue-700">
            <li className="hover:text-blue-500 cursor-pointer transition-colors">📞 +91 98765 43210</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">✉️ business@anantamart.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-blue-200 mt-10">
        <p className="py-6 text-sm text-center text-blue-600">
          &copy; 2025 AnantaMart. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
