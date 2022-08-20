import React from "react";
import "./Cart.scss";
import {createPortal} from 'react-dom'
import lowestPrice from "../../../public/static/images/lowest-price.png";
import { addItemToCart, removeItemFromCart } from "../../utilities/CommonFunctions/utils";
import {useNavigate} from "react-router-dom"
function Cart({setIsOpen,cartData,setCartData,userIsDesktop=false}) {

  const itemArray=Object.values(cartData);
  let totalPrice=0;
  const navigate=useNavigate();
  const handleIncrement=(data)=>{
    let {newCartData,status}=addItemToCart(data,cartData);
    console.log("Status : ",status);
    if(status === 'Success')
      setCartData(newCartData);
    else alert("Stock Out!")

  }

  const handleDecrement=(data)=>{
    let {newCartData}=removeItemFromCart(data,cartData)
    setCartData(newCartData);

  }

  const cartContent= <section className="cart_container">
   <header className="cart_header">
     <h3 className="cart_heading">My Cart ({itemArray.length>1? (`${itemArray.length} items`):(`${itemArray.length} item`)})</h3>
     <span className="close" onClick={()=>userIsDesktop? setIsOpen(false): navigate("/",{replace:true} )}>X</span>
   </header>
   <div className="cart_main_contents">
     {Object.keys(cartData).length > 0 ? (<div> 
     {itemArray.map((items)=>{
      let itemPrice=0; 
      itemPrice=itemPrice+(items.price*items.quantity)
      totalPrice=totalPrice+itemPrice
      return <div className="cart_items_details" key={items.id}>
       <img src={items.imageURL} alt={items.name} className="cart_item_image" />
       <div className="item_purchase_details">
         <h3 className="item_name">{items.name}</h3>
         <div className="item_stock_price">
           <div className="item_stock">
             <button className="increment_cart_quantity action_btn_cart" onClick={()=>handleIncrement(items)}>+</button>
             <span className="cart_quantity">{items.quantity}</span>
             <button className="decrement_cart_quantity action_btn_cart" onClick={()=>handleDecrement(items)}>-</button>
           </div>
           <span className="cart_multiply">X</span>
           <span className="item_price">Rs. {items.price}</span>
           <span className="total_item_price">Rs. {itemPrice}</span>

         </div>
       </div>
     </div>})}
      <div className="guaranty_section">
      <img src={lowestPrice} alt="lowest price guaranteed" className="guaranty_image" />
      <p className="guaranty_text">You won't find it cheaper anywhere</p>
    </div>
    </div>): <div className="align_center">
             <h3>No items in your cart</h3>
             <p style={{textAlign:"center"}}>Your favorite items are just a click away!</p>
       </div>}
    
   </div>


   {Object.keys(cartData).length > 0 ? (<div className="checkout_section">
     <p className="promo_code">Promo code can be applied on payment page</p>
     <button className="checkout_button cart_btn_primary" onClick={()=>userIsDesktop? setIsOpen(false): navigate("/",{replace:true} )}>
       <span className="checout_button_text">Proceed to Checkout</span>
       <span className="item_checkout_price">{`Rs.${totalPrice} >`}</span>
     </button>
   </div>) : ( <button className="start_shopping cart_btn_primary" onClick={()=>userIsDesktop? setIsOpen(false): navigate("/",{replace:true} )}>
         Start Shopping
     </button>)}
 </section>


   return userIsDesktop? createPortal(
    <div className="cart_modal">
      {cartContent}
    </div>
    ,document.getElementById("portal")) : cartContent;
}

export default Cart;
