import React, { useEffect, useState } from 'react';
import axios from "axios";
// import { useHistory } from 'react-router-dom';


const CheckoutComponent = () => {

    const [email ,setEmail]=useState("");
    const [number,setnumber]=useState("");
    const [ month ,setMonth] =useState("");
    const [ year ,setYear] =useState("");
    const [ securityCode ,setSecurityCode] =useState("");
    const [ cardname , setCardName]=useState("");
    const [ error, setError] = useState("");
    const [blogPost, setBlogPost] = useState(null);

    // const history = useHistory();


    const hendlePayment = async (e) => {
        e.preventDefault();

        // Validation
    if (!validateEmail(email)) {
        setError("Please enter a valid email.");
        return;
      } else{
          setError("");
      }
  
      // if (!validatenumber(number)) {
      //   setError("Password must be at least 6 characters.");
      //   return;
      // }   else {
      //     setError("");
      // }

        try {
            const response = await axios.post ('http://localhost:5000/cardcheck',{
                "email" : email,
                "number" : number,
                "month" : month ,
                "year" : year ,
                "securityCode" : securityCode ,
                "cardname" : cardname 
            });
            console.log(response.status)
            if( response.status === 200){
            alert("Your purchase was completed successfully!");

 

            await axios.post('http://localhost:5000/order', blogPost)
            .then(() =>{

                 axios.delete('https://fakestoreapi.com/cart')
                .then(() => {
                  // Redirect to the order page after successfully removing cart items
                  // history.push('/order'); // Change '/order' to the URL of your order page
                })
                .catch((error) => {
                  setError("An error occurred while removing items from the cart.");
                });

                

            })

            .catch((error) => {
                setError("An error occurred while saving items in the order.");
            });
        
        
        }

        }
        catch (error) {
            if (error.response && error.response.status === 409) {
              setError("Email is already taken. Please use a different email.");
            } else {
              setError("An error occurred. Please try again.");
            }
          }
    };

    // getCart------------------------------------------------------------------------------------------------getCart

    useEffect(() => {
        axios.get('https://fakestoreapi.com/cart')
          .then((response) => {
            setBlogPost(response.data);
          })
          .catch((error) => {
           
            setError("An error occurred. Please try again.");
          });
      }, []);

      if (!blogPost) {
        return <div>Loading...</div>;
      }

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };
    
      // const validatenumber= (number) => {
      //   return password.length  === 16;
      // };


    const months = [
        1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12
      ];

      const years = [
       23, 24, 25 ,26, 27, 28,
       29, 30, 31, 32, 33, 34
      ];

  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl text-left font-medium text-gray-700 sm:text-3xl">Secure Checkout<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>
            <form action="" className="mt-10 flex  text-left flex-col space-y-4" onSubmit={hendlePayment}>
              <div><label htmlFor="email" className="text-xs  font-semibold text-gray-500">Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="john.capler@fang.com" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
              <div className="relative"><label htmlFor="card-number" className="text-xs font-semibold text-gray-500">Card number</label><input  value={number} onChange={(e) => setnumber(e.target.value)} type="text" id="card-number" name="card-number" placeholder="1234-5678-XXXX-XXXX" className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" className="absolute bottom-3 right-3 max-h-4" /></div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Expiration date</p>
                <div className="mr-6 flex flex-wrap">
               
               
             <div className="my-1">
               
                  <select name="month" id="month" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                    <option value="">Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month} onChange={(e) => setMonth(e.target.value)}>{month}</option>
                    ))}
                  </select>
                </div>

                  <div className="my-1 ml-3 mr-6">
                    <label htmlFor="year" className="sr-only">Select expiration year</label>
                    <select name="year" id="year" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                      <option value="">Year</option>
                      {years.map((year,index) => (
                        <option key={index} value={year} onChange={(e) => setYear(e.target.value)}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative my-1"><label htmlFor="security-code" className="sr-only">Security code</label><input value={securityCode} onChange={(e) => setSecurityCode(e.target.value)} type="text" id="security-code" name="security-code" placeholder="Security code" className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
                </div>
              </div>
              <div><label htmlFor="card-name" className="sr-only">Card name</label><input value={cardname} onChange={(e) => setCardName(e.target.value)}  type="text" id="card-name" name="card-name" placeholder="Name on the card" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
            </form>
            <p className="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <a href="#" className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</a></p>
            <button type="submit" className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              <li className="flex justify-between">
                <div className="inline-flex">
                  <img src= {blogPost.image} alt={blogPost.title} className="max-h-16" />
                  <div className="ml-3 text-left">
                    <p className="text-base  font-semibold text-white">{blogPost.title}</p>
                    <p className="text-sm font-medium text-white text-opacity-80">{blogPost.description}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">{blogPost.price}</p>
              </li>
             
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white"><span>{blogPost.total}</span><span>$510.00</span></p>
              <p className="flex justify-between text-sm font-medium text-white"><span>Vat: 10%</span><span>$55.00</span></p>
            </div>
          </div>
          <div className="relative text-left mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="text-sm font-semibold">+962 78 067 98 76 <span className="font-light">(International)</span></p>
            <p className="mt-1 text-sm font-semibold">support@nanohair.com <span className="font-light">(Email)</span></p>
            <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
          </div>
          <div className="relative mt-10 flex">
            <p className="flex flex-col"><span className="text-sm font-bold text-white">Money Back Guarantee</span><span className="text-xs font-medium text-white">within 30 days of purchase</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
