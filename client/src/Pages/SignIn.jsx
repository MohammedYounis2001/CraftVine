import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from 'react-google-login';
const SignIn = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(['token']);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      // Assuming the API returns a token
      const token = response.data.token;

      // Set the token in a cookie
      setCookie('token', token, { path: '/' });
      setError("Sign-in successful");
      history("/");

      // Handle successful sign-in, e.g., redirect or show a success message
      // alert("Sign-in successful:", response.data);
      console.log("Sign-in successful:", response.data);
    } catch (error) {
      // Delay the error message and handle it
      setTimeout(() => {
        console.error("Sign-in error:", error);
        setError("Sign-in failed. Email or password is invalid");
      }, 300);
    }
    // const responseGoogle = async (response) => {
    //   if (response.error) {
    //     setError("Google Sign-In failed. Please try again.");
    //   } else {
    //     try {
    //       // Send the Google OAuth response to your server for verification
    //       const googleResponse = await axios.post("YOUR_BACKEND_ENDPOINT", {
    //         idToken: response.tokenId,
    //       });
  
    //       // Handle the response from your server and set cookies or redirect
    //       // based on your application's requirements
    //       console.log("Google Sign-In successful:", googleResponse.data);
    //     } catch (error) {
    //       console.error("Google Sign-In error:", error);
    //       setError("Google Sign-In failed. Please try again.");
    //     }
    //   }
  };

  return (
    <div className="p-20 bg-image bg-[50%] bg-cover" style={{backgroundImage: 'url(https://miro.medium.com/v2/resize:fit:1126/1*ELBnrKVFj1M-CaD3G-jVtA.jpeg)', height: '400px'}}>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white px-20 py-5 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">

          <h2 className="font-bold text-2xl mb-5 text-center">SignIn</h2>

          <div>
            <input
              className="w-full p-2 border rounded-md mt-4"
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded-md mt-4"
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 transition delay-150 duration-300 ease-in-out">{error}</p>}
          <br/><br/>
          <button
            onClick={handleSignIn}
            className="w-full p-2 bg-teal-600 text-white rounded-3xl mt-4 hover:bg-teal-400"
          >
            SignIn
          </button>
          <br/><br/>
          <p className="text-center text-sm text-gray-500">Don't have an account yet?
            <a href="#!"
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign up
            </a>.
          </p>
          <br/>
         <a href='http://localhost:5000/auth/google'><div className="flex items-center justify-center  dark:bg-gray-800">
  <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150  hover:bg-teal-15">
    <img
      className="w-6 h-6"
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      loading="lazy"
      alt="google logo"
    />
    <span>Login with Google</span>
  </button>
</div></a> 


          {/* <a href="#" className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">FORGOT PASSWORD?</a> */}
          {/* <div className="my-4">
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"
          buttonText="Sign In with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div> */}
        </div>
      </div>
    </div>
  );
}



export default SignIn;