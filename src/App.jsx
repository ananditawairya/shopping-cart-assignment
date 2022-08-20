import Cart from "./components/Cart/Cart";
import Modal from "./utilities/Modal/Modal";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import Footer from "./utilities/Footer/Footer";
import Navbar from "./utilities/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login-Form/Login";
import Register from "./components/Registration-Form/Register";
import ProductsListing from "./components/ProductsListing-Page/ProductsListing";
import { Context } from "./context/Contexts";
import { Routes, Route, Navigate } from "react-router-dom";

const userData = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  cpassword: ""
}

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [cartData, setCartData] = useState({})
  const [userValidationData, setUserValidationData] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [categorySelection, setCategorySelection] = useState({})
  const [lastState, setLastState] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3010/categories`)
      .then((res) => res.json())
      .then((data) => {
        const newCategoryData = data.filter(dtf => dtf.order > 0).sort((a, b) => a.order - b.order);
        setCategoryData(newCategoryData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app">
      <Context.Provider value={{
        categoryData, setCategoryData, open, setIsOpen, cartData, setCartData, userValidationData, setUserValidationData, currentUser, setCurrentUser, categorySelection, setCategorySelection,
        lastState, setLastState
      }}>
        <Navbar />
        <Routes>
          <Route path="/plp" element={<ProductsListing />} />
          <Route path="/cart" element={<Cart setIsOpen={setIsOpen} cartData={cartData} setCartData={setCartData} />} />

          <Route path="/plp/:id" element={<ProductsListing />} />
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
        <Footer />
      </Context.Provider>

      <Modal open={isOpen}><Cart userIsDesktop={true} setIsOpen={setIsOpen} cartData={cartData} setCartData={setCartData} /></Modal>
    </div>
  );
};

export default App;
