import React,{useContext,useEffect,useState} from "react";
import logo from "../../../public/static/images/logo.png";
import "./Navbar.scss";
import Cart from "../../Icons/Cart";
import {Outlet,Link,useNavigate} from "react-router-dom"
import { Context } from '../../context/Contexts';
import Button from "../../utilities/Button/Button";
function Navbar() {
  const { cartData,setIsOpen,currentUser , setCurrentUser } = useContext(Context);
  const navigate=useNavigate();
  const logout =()=>{
    setCurrentUser({});
  }
  const [userIsDesktop, setUserIsDesktop] = useState(true);
  useEffect(() => {

    window.innerWidth > 960 ? setUserIsDesktop(true) : setUserIsDesktop(false);

  }, [userIsDesktop]);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-start">
          <img src={logo} alt="Sabka Bazaar Homepage." className="logo"
          onClick={()=>navigate("/",{replace:true})}></img>
          <div className="navigation_links">
          <Link to="" className="home links">Home</Link>
          <Link to="plp" className="products links">Products</Link>
          </div>
        </div>
        <div className="navbar_end">
          {Object.keys(currentUser).length ? (<div>
            <h3>{currentUser.Name}</h3>
            <Button handleButtonClick ={logout} buttonText="Logout"></Button>
            </div>): (<div className="authentication_links">
            <Link to="login" className="sign_in auth_links">
              Sign In
            </Link>
            <Link to="register" className="register auth_links">
              Register
            </Link>
          </div>)}
          <div className="button-container">
            <button className="add_to_cart" onClick={()=>userIsDesktop? setIsOpen(true) : navigate("/cart",{replace:true})}>
              <Cart fill="#e91e63" className="cart_image" />
              <span className="">{Object.keys(cartData).length} Items</span>
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
