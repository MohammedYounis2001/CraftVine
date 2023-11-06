import React from 'react';
import { Link } from 'react-router-dom';

const Discount = () => {


    const divStyle1 = {
        backgroundImage: 'url("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };

      const divStyle2 = {
        backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1681980018817-b36ab8848616?auto=format&fit=crop&q=80&w=1471&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };

      const divStyle3 = {
        backgroundImage: 'url("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1558&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };


  return (
    <div className="flex justify-center items-center w-full">
    <section className="bg-white py-6 sm:py-8 lg:py-12">
    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      
      <div className="relative mb-10 pt-8 md:mb-16">
        <h2 className="mb-4 text-center left-1/2 font-serif text-3xl font-bold text-teal-600 md:mb-6 md:text-4xl">Discount</h2>
        
      </div>
    
      
      <div className="flex justify-center items-center w-full mx-10">
        <div className="mr-10 " >
          <Link to= "/discount/20" className="block  rounded-lg  h-60 p-2 transition hover:scale-105" style={divStyle1} href="#">
            
            <div className="flex items-center rounded-md px-4 py-3">
              
              <p className="ml-4 w-56">
                <strong className="block text-lg font-medium text-black">20% OFF</strong>
                <span className="text-xxl  text-black"> Great offers </span>
              </p>
            </div>
          </Link>
        </div>
       
        <div className="mr-10 h-96" >
          <Link to ="/discount/70" className="block  rounded-lg  h-60 p-2 transition hover:scale-105" style={divStyle2} href="#">
           
            <div className="flex items-center rounded-md px-4  py-3">
              
              <p className="ml-4 w-56">
                <strong className="block text-lg font-medium text-black">70 % OFF</strong>
                <span className="text-xxl text-black"> Strong offers </span>
              </p>
            </div>
          </Link>
        </div>
       
       
        <div className="mr-10" >
        <Link to="/discount/50" className="block  rounded-lg  h-60 p-2 transition hover:scale-105" style={divStyle3} href="#">
           
            <div className="flex items-center rounded-md px-4 py-3">
            
              <p className="ml-4 w-56">
                <strong className="block text-lg font-medium text-black">50 % OFF</strong>
                <span className="text-xxl text-black"> Important offers </span>
              </p>
            </div>
          </Link>
        </div>
     <div/>
      
        
        
      
    </div>
    </div>
  </section>
  </div>
  
  );
};

export default Discount;
