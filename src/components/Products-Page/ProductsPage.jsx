import React, { useState, useEffect, useContext } from 'react'
import "./ProductsPage.scss"
import Button from '../../utilities/Button/Button';
import { useParams } from 'react-router-dom'
import { Context } from '../../context/Contexts';
import { addItemToCart } from "../../utilities/CommonFunctions/utils"
function ProductsPage() {
  const { id } = useParams()
  const { setCartData, cartData, categorySelection } = useContext(Context);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3010/products`)
      .then((res) => res.json())
      .then((data) => {
        data.sort(function (a, b) {
          return a.order - b.order;
        });
        setProductsData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (data) => {
    let { newCartData, status } = addItemToCart(data, cartData);
    console.log("Status : ", status);
    if (status === 'Success')
      setCartData(newCartData);
    else alert("Stock Out!")

  }

  return (
    <section className='products_section'>
      <div className='products_card_list'>
        {(id && categorySelection[id] ? productsData?.filter(data => id === data.category) : productsData)?.map((data) => {

          return <div className="product_card" key={data.id}>
            <div className="item_name">
              <h3 className='item_heading'>{data.name}</h3>
            </div>
            <div className="item_details">
              <img src={data.imageURL} alt="" className="item_image" />
              <p className="image_description">{data.description}</p>
            </div>
            <div>
              <div className="item_purchase_section">
                <p className="item_price">{`MRP Rs.${data.price}`}</p>
                <Button className="buy" buttonText="Buy Now" handleButtonClick={() => handleClick(data)} />
              </div>
              <div className="purchase_button">
                <Button className="buy" buttonText={`Buy Now @ ${`Rs.${data.price}`}`} handleButtonClick={() => handleClick(data)} />
              </div>
            </div>
          </div>
        })}
      </div>
    </section>
  )
}

export default ProductsPage