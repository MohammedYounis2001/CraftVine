import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const hendleSignUp = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    } else{
        setError("");
    }

    if (!validatePassword(password)) {
      setError(`Password must contain at least one lowercase letter, one uppercase letter, \n
      one digit,\n one special character (@#$%^&!), and be between 6 and 30 characters in length.`);
      return;
    }   else {
        setError("");
    }
    if(!validateFirstName(first_name))
    {
    setError("First Nmae must be between 3 and 20 characters in length.");
      return;
    }else {
       setError("");
    }

    if(!validateLastName(last_name))
    {
    setError("Last Name must be between 3 and 20 characters in length.");
      return;
    }else {
       setError("");
    }
   
   

    try {
      const response = await axios.post("http://localhost:5000/registration", {
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "password": password,
        "phone": phone
      });

      console.log(response.status)
      if (response.status === 201) {
        alert("Sign Up successful!");
        history("/login");

       
      }
     
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Email is already taken. Please use a different email.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(com|net)$/.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{6,30}$/;
    return passwordPattern.test(password);
  };
  const validateFirstName = (first_name) => {
    return /^[A-Za-z\s]{3,20}$/.test(first_name);
  };
  
  const validateLastName = (last_name) => {
    return /^[A-Za-z\s]{3,20}$/.test(last_name);
  };
  
  

  

  return (
    <div className="p-20 bg-image bg-[50%] bg-cover}" style={{ backgroundImage: "url(https://miro.medium.com/v2/resize:fit:1126/1*ELBnrKVFj1M-CaD3G-jVtA.jpeg)", height: "400px" }}>
      <div className="flex justify-center items-center h-screen ">
        <div className="bg-white px-20 py-5 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
          <h2 className="font-bold text-2xl mb-5 text-center">Sign Up </h2>
          <div className="grid grid-cols-2 gap-4 ">
            <input
              className="w-full p-2 border rounded-md"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              type="text"
              required
            />
            <input
              className="w-full p-2 border rounded-md"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              type="text"
              required
            />
          </div>
          <input
            className="w-full p-2 border rounded-md mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="w-full p-2 border rounded-md mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <div>
            <input
              className="w-full p-2 border rounded-md mt-4"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              id="phone"
              name="phone"
            //   pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}"
              placeholder="Enter phone number (e.g. 78-956-6789)"
            //   title="Phone number must be in the format 12-345-6789"
              required
            />
          </div>
          <button
            className="w-full p-2 bg-teal-600 text-white rounded-3xl mt-4 "
            onClick={hendleSignUp}
          >
            Sign up
          </button>
          {error && !error.email && !error.password && (
            <p className="text-red-600 mt-2">{error}</p>
          )}
          <button className=" mt-4  focus:outline-none text-blaxk  border-0 py-3 px-12 w-40 font-bold text-sm cursor-pointer transition-all duration-300  ">
            {" "}
            or Log in
          </button>
          <div className="flex justify-center">
            <button className="p-2 mx-3 text-blue-500">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="p-2 mx-3 text-blue-500">
              <i className="fab fa-twitter"></i>
            </button>
            <button className="p-2 mx-3 text-blue-500">
              <i className="fab fa-google"></i>
            </button>
            <button className="p-2 mx-3 text-blue-500">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
