import React from 'react'
import "./Button.scss"
function Button(props) {
  const {type,className,id,buttonText,handleButtonClick}=props



  return (
    <button type={type} className={`my_button ${className}`} id={id} onClick={handleButtonClick}>{buttonText}</button>
  )
}

export default Button