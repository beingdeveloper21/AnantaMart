import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  // Feature grid data with images
  const featureColumns = [
    {
      img: assets.secure,
      title: 'Secure Payments',
      subtitle: '100% Protected',
    },
    {
      img: assets.trusted,
      title: 'Trusted by 10K+',
      subtitle: 'Happy Customers',
    },
    {
      img: assets.payment,
      title: 'Flexible Payment',
      subtitle: 'Multiple Options',
    },
    {
      img: assets.quality,
      title: 'Quality Assured',
      subtitle: 'Certified Products',
    },
  ];

  return (
    <div>
      {/* ABOUT US */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={' US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img
          className='w-full md:max-w-[450px]'
          src={assets.about}
          alt='About us'
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Welcome to AnanataMart, your trusted partner in B2B e-commerce for
            businesses of every scale.
          </p>
          <p>
            We specialize in providing a complete range of products that power
            workplaces, factories, and construction projects. From electronics
            and office supplies to industrial equipment, office furniture,
            electrical supplies, safety materials, and building materials, we
            bring everything you need under one roof.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            At AnanataMart, we aim to make business procurement smarter, faster,
            and more affordable, while delivering value and trust to every
            customer.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={' CHOOSE US'} />
      </div>

      {/* 4-column grid with logos */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center'>
        {featureColumns.map((item, index) => (
          <div
            key={index}
            className='border p-8 flex flex-col justify-center items-center gap-4 hover:shadow-lg transition min-h-[200px]'
          >
            {/* Logo */}
            <img
              src={item.img}
              alt={item.title}
              className='w-12 h-12 object-contain'
            />

            {/* Title & Divider */}
            <b className='text-gray-800'>{item.title}</b>
            <div className='w-12 border-t border-gray-400'></div>
            <b className='text-gray-800'>{item.subtitle}</b>
          </div>
        ))}
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default About;
