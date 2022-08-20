import React from 'react'
import "./ProductsListing.scss"
import Sidebar from '../Sidebar/Sidebar'
import ProductsPage from '../Products-Page/ProductsPage'
function ProductsListing() {
  return (
    <div className='products-listing-page'>
      <Sidebar  />
      <ProductsPage   />
    </div>
  )
}

export default ProductsListing