import '../App.css'
import { useState, useEffect } from 'react'

export default function CartPage({ cart, resetCart }){
    const [cartTotal, setCartTotal] = useState(0)
    
    const totalPrice = cart.map((cartItem) => {
        let res = cartItem.price.slice(1)
        
        return parseInt(res)
    })

    useEffect(() => {
        setCartTotal(totalPrice.reduce((prev, next) => prev + next, 0))
    }, [])

    useEffect(() => {
        setCartTotal(totalPrice.reduce((prev, next) => prev + next, 0))
    }, [cart])

    const cartItems = cart.map((cartItem) => {
        return(
            <div className="cartItem">
                <div className="cartItemImageContainer">
                    <img src={cartItem.product_image} alt="cart-picture" className="cartItem-image"/>
                </div>
                <div className="cartItemTitleContainer">
                    <h1 className="cartItemTitle">{cartItem.product_name}</h1>
                    <h1 className="cartItemPrice">{cartItem.price}</h1>
                </div>
            </div>
        )
    })

    return(
        <div className="cartContainer">
            <div className="cartTitleContainer">
                <h1 className="cartTitle">My Cart</h1>
            </div>
            {cart.length <= 0 && 
            <div className="emptyCartContainer">
                <h4 className='emptyCart'>Empty cart...</h4>
            </div>}
            <div className="cartItems">
                {cartItems}
            </div>
            <div className="checkoutContainer">
                <h3 className='total'>Total: ${cartTotal} {cart.length > 0 && `(${cart.length} items)`}</h3>
                <button className='checkoutButton' onClick={resetCart}>Checkout</button>
            </div>
        </div>
    )
}