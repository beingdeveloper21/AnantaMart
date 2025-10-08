import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img className='mb-5 w-40 h-40' alt="" src={assets.logonew}/>
            <p className='w-full md:w-2/3 text-gray-600'>Get access to quality products,competitive pricing,and dedicated business support.</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>CUSTOMER SUPPORT</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Help Center</li>
                <li>Payment Methods</li>
                <li>Return and Refunds</li>
                <li>Shipping Info</li>
            </ul>
        </div>
        <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 98765 43210</li>
            <li>business@anantamart.com</li>
        </ul>
        </div>
      </div>
      <div>
        <hr/>
        <p className='py-5 text-sm text-center'>Copyright 2025@ AnantaMart.com - All Rights Reserved</p>
      </div>
      </div>

  )
}

export default Footer
