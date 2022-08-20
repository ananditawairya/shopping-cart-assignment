import React from "react";
import "./Input.scss"
function Input(props) {
  const {type,inputId,inputClassName,required,placeholder,value,labelText,labelClassName , onChange}=props
  return (
    <div>
      <div className="input_container">
        <input type={type} id={inputId} required={required} className={inputClassName}
        placeholder={placeholder} value={value} onChange={onChange}/>
        <label htmlFor={inputId} className={labelClassName && 'filled'}>{labelText}</label>
      </div>
    </div>
  );
}

export default Input;
