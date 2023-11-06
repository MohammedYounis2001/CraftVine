import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from './Context/AuthContext';
import "./App.css";
import Home from "./Pages/Home";
import Footer from "./Components/website/Footer";
import Navbar from "./Components/website/Navbar";
import NotFound from "./Components/website/NotFound";
import Account from "./Pages/Account";
import SignIn from "./Pages/SignIn";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import OrderPage from "./Pages/Order";
import ProductPage from "./Pages/ProductPage";
import CategoryContent from "./Pages/CategoryContent";
import DisProducts from "./Pages/Dis";
import ProductSection from "./Pages/Detail";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <AuthProvider> */}
        <Navbar />
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/category/:category" element={<CategoryContent />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/discount/:dis" element={<DisProducts />} />
            <Route path="/product/:id" element={<ProductSection />} />
          </Routes>
        </div>
        <Footer />
        {/* </AuthProvider> */}
      </Router>
    </div>
  );
}

export default App;
