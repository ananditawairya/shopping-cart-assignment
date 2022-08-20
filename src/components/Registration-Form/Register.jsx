import React, { useContext, useState } from 'react'
import Input from '../../utilities/Input/Input';
import Button from '../../utilities/Button/Button';
import { Context } from "../../context/Contexts";
import { useNavigate } from 'react-router-dom';
import "./Register.scss"
function Register() {
  const {userValidationData,setUserValidationData ,setCurrentUser}=useContext(Context);
  const [errorVal,setErrorVal] = useState({})
  const navigate=useNavigate();
  const validatePassword=(input) =>{

  let errors = [];
  console.log("inside validate password",input)
  if (input.length < 6) {
      errors.push("Your password must be at least 6 characters"); 
  }
  if (input.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
  }
  if (input.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit."); 
  }
  // if (/\S/.test(input)   ) {
  if (input.includes(' ')   ) {
      errors.push("String should not contain a white space");
  }
  if (errors.length > 0) {
      setErrorVal({...errorVal,['passwordError']: errors.join("\n"), ['emailError']:''});
      return false;
  }
  return true;
  }
  const handleRegister =(e)=>{
    setErrorVal({})
    e.preventDefault();
    let fname=e.target[0].value
    let lname=e.target[1].value
    let email=e.target[2].value
    let password=e.target[3].value
    let cpassword=e.target[4].value

    let register = {
      fname,lname,email,password
    }
    let errorMessage={};

    if( !userValidationData[email]){
      let pattern= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if(!email.match(pattern)){ //passed
        console.log("Wrong email ")
        errorMessage['emailError']="Please enter a valid email address"
        setErrorVal(errorMessage)
      }else if(!validatePassword(password)){        
        console.log("error in password format")
      }else if(cpassword!==password){
        errorMessage['cpasswordError']="Passwords donot match"
        setErrorVal(errorMessage)
      }
    else{      
        let tempdata= { ...userValidationData,[email]: register}
        console.log("tempdata ",tempdata)
        setUserValidationData(tempdata);
        let user={
          email,
          Name : (fname +" "+lname)
        }
        setCurrentUser(user);
        console.log("userValidationData register  ",userValidationData)
        navigate("/")
      }
    }
    else{
      errorMessage['existingUser']="User already exists"
      setErrorVal(errorMessage)
    }
    }
  return (
    <main className="registration_container">
    <div className="registration_header">
      <h1 className="registration_heading">Signup</h1>
      <p>We do not share your personal details with anyone</p>
    </div>
    <form className="registration_form" onSubmit={handleRegister}>
      <Input const type="text" inputId="registration_first_name" inputClassName="registration_first_name" required={true} labelClassName="registration_first_name_label" labelText="First Name"/>
      <Input const type="text" inputId="registration_last_name" inputClassName="registration_last_name" required={true} labelClassName="registration_last_name_label" labelText="Last Name"/>
      <Input const type="email" inputId="registration_email" inputClassName="registration_email_input" required={true} labelClassName="registration_email_label" labelText="Email"/>
      {errorVal.emailError && <div className='error_message'>{errorVal.emailError}</div>}

      <Input const type="password" inputId="registration_password" inputClassName="registration_password_input" required={true} labelClassName="registration_password_label" labelText="Password"/>
      {errorVal.passwordError && <div className='error_message'>{errorVal.passwordError}</div>}

      <Input const type="password" inputId="registration_cpassword" inputClassName="registration_cpassword_input"    required={true} labelClassName="registration_cpassword_label" labelText="Confirm Password"
      />
      {errorVal.cpasswordError && <div className='error_message'>{errorVal.cpasswordError}</div>}
      <Button id="registration_button" buttonText="Signup" />
      {errorVal.existingUser && <div className='error_message'>{errorVal.existingUser}</div>}

    </form>
  </main>
  )
}

export default Register