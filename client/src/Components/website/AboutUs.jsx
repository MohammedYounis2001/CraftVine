import React from 'react'

const AboutUs = () => {
  return (
    <div>
      <div className='flex flex-col-reverse gap-4 md:flex-row justify-center items-center'>
        <div className='w-1/2 p-8'>
            <h1 className='py-5 text-teal-600 text-center text-2xl md:text-4xl'>About Us</h1>
            <p className='text-start'>Craft Vine is a dedicated online platform offering a wide array of household appliances designed to simplify and enhance everyday living. Our site provides a convenient and comprehensive shopping experience for individuals seeking top-quality, innovative, and reliable home appliances.

With a focus on modern technology and user convenience, Craft Vine curates a diverse selection of products, ranging from kitchen gadgets to home electronics, aimed at fulfilling the needs of every household. Our collection includes a variety of appliances that are efficient, durable, and cater to various lifestyle requirements.

At Craft Vine, we are committed to delivering an extensive range of appliances that combine functionality, design, and affordability. Our platform is designed to ensure a seamless shopping journey, empowering customers to find the perfect solutions for their homes.

Explore our platform to discover an assortment of appliances that aim to transform the way you manage household tasks, bringing convenience and ease into your daily routines.</p>
        </div>
        <div className='w-1/2 p-5'>
            <img className='object-cover' src="https://bl-i.thgim.com/public/todays-paper/tp-others/tp-variety/bhw23c/article66166927.ece/alternates/FREE_1200/Consumer-Affair%2BG4EAHRNS3.4.jpg.jpg" alt="About us" />
        </div>
      </div>
    </div>
  )
}

export default AboutUs