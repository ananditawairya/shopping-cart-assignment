import React from 'react'
import "./Footer.scss"
import { useLocation } from 'react-router-dom';

function Footer() {
const location = useLocation()

return (
    <footer className={`footer ${location.pathname.includes('cart')? 'no_display' : ''}`}>Copyright &#169; 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd</footer>
)
}

export default Footer