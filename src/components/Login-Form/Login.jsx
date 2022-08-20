import React, { useContext } from "react";
import "./Login.scss"
import  Input  from "../../utilities/Input/Input";
import Button from "../../utilities/Button/Button";
import { Context } from "../../context/Contexts";
import { Link, useNavigate } from "react-router-dom";

  function Login() {
  const {userValidationData,setUserValidationData,currentUser,setCurrentUser}=useContext(Context)
  const navigate=useNavigate();
  const handleLogin=(e)=>{
    e.preventDefault();
    let email=e.target[0].value
    let password=e.target[1].value
    console.log('userValidationData  Login ',userValidationData)
    if(userValidationData[email]){
      console.log("userValidationData[email] ",userValidationData)
      let user={
        email,
        Name : userValidationData[email].fname +" "+userValidationData[email].lname,
      }

      if( userValidationData[email]['password'] === password){
        setCurrentUser(user);
        console.log("userValidationData Login  ",userValidationData)
        navigate("/");
      }else {
        alert("Incorrect Password")
        navigate("/login")
      }
     
      alert("User Exists",user)

    }
    else{
      console.log("New User")
      navigate("/login")
    }
  }

  return (
    <main className="login_container">
      <div className="login_header">
        <h1 className="login_heading">Login</h1>
        <p>Get aceess to your Order, Wishlist and Recommendations </p>
      </div>
      <form className="login_form" onSubmit={handleLogin}>
        <Input const type="email" inputId="login_email" inputClassName="login_email_input" required={true} labelClassName="login_email_label" labelText="Email"/>
        <Input const type="password" inputId="login_password" inputClassName="login_password_input" required={true} labelClassName="login_password_label" labelText="Password"/>
        <Button id="login_button" buttonText="Login" />
      </form>
    </main>
  );
}

export default Login;