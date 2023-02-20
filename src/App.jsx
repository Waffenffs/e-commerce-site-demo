import { Routes, Route, Link } from 'react-router-dom'
import { CiShoppingCart } from 'react-icons/ci'
import LandingPage from './pages/LandingPage'
import CartPage from './pages/CartPage'
import ClothingPage from './pages/ClothingPage'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import './App.css'

export default function App(){
  const [cartItems, setCartItems] = useState([])
  const [items, setItems] = useState([
    {
      id: nanoid(),
      price: '$299',
      product_name: 'RAGLAN CARCOAT',
      main_image: 'https://balenciaga.dam.kering.com/m/578a919e6f7df51d/Small-733758TNP091000_G.jpg?v=2',
      secondary_images: [
        'https://balenciaga.dam.kering.com/m/5090d2a3c4a67ff1/Small-733758TNP091000_F.jpg?v=2',
        'https://balenciaga.dam.kering.com/m/384c8c722a74d7d/Small-733758TNP091000_D.jpg?v=3'
      ],
      description: 'Raglan Carcoat is a daring attire that endows any wearer a veil of mystery.'
    }
  ])

  const handleClick = (thisState) => {
    const clothingObject = {
      id: thisState.id,
      product_name: thisState.product_name,
      price: thisState.price,
      product_image: thisState.secondary_images[0]
    }

    setCartItems(prevState => [...prevState, clothingObject])
  }

  const resetCart = () => {
    setCartItems([])
  }

  return(
    <>
      <nav>
        <div className="redirectContainer">
          <h1 className='websiteTitle'>Waffion</h1>
        </div>
        <div className="homeRedirectContainer">
          <Link to="/" className='link'>
            <h2 className='homeRedirect'>Home</h2>
          </Link>
        </div>
        <Link to='/cart' className='link'>
          <CiShoppingCart className='cart' />
        </Link>
      </nav>

      <Routes>
        <Route path='/' element={ <LandingPage items={items} /> } />
        <Route path='/cart' element={ <CartPage cart={cartItems} resetCart={resetCart} /> } />
        <Route path='/clothing/*' element={ <ClothingPage handleClick={handleClick} /> }/>
      </Routes>
    </>
  )
}