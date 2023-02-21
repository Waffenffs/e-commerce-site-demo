import { Routes, Route, Link } from 'react-router-dom'
import { CiShoppingCart } from 'react-icons/ci'
import { GiLion } from 'react-icons/gi'
import LandingPage from './pages/LandingPage'
import CartPage from './pages/CartPage'
import ClothingPage from './pages/ClothingPage'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { HiOutlineBars3 } from 'react-icons/hi2'
import LoginPage from './pages/LoginPage'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './pages/LoginPage'
import './App.css'
import ProfilePage from './pages/ProfilePage'

export default function App(){
  /* 
    ######################
    #       TODOS        #
    ######################

    1. Add a user authentication (through Firebase Auth)
    2. Utilize a database to store user information, such as carts, favorites (through Firebase Firestore)
    3. Add some animations
    4. Congrats. You have something worthy to show in your portfolio.
  */

  const [displayBar, setDisplayBar] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        // logged in
        setUser(user)
        setLoggedIn(true)
      } else {
        // logged out
        setLoggedIn(false)
      }
    })
  }, [])

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
          <GiLion className='lionIcon' />
          <h1 className='websiteTitle'>Waffion</h1>
        </div>
        <div className="homeRedirectContainer">
          <Link to="/" className='homeLink'>
            <h2 className='homeRedirect'>Home</h2>
          </Link>
        </div>
        <Link to={loggedIn ? '/cart' : '/login'} className='link'>
          <CiShoppingCart className='cart' />
        </Link>
        <HiOutlineBars3 className='sideBar' onClick={() => setDisplayBar(prevState => !prevState)}/>
          {displayBar && 
            <div className='navSideBar'>
              {!loggedIn && 
              <>
                <Link className='sideBarLink' to="/login" onClick={() => setDisplayBar(false)}>
                  <div className="navSideBarLogin">Login</div>
                </Link>
                <div className="navSideBarContact">Contact</div>
              </>
              }
              {loggedIn &&
              <>
                <Link className='sideBarLink' to="/profile" onClick={() => setDisplayBar(false)}>
                  <div className="navSideBarLogin">Profile</div>
                </Link>
                <div className="navSideBarContact">Contact</div>
              </>
              }
            </div>
          }
      </nav> 

      <Routes>
        <Route path='/' element={ <LandingPage items={items} /> } />
        <Route path='/cart' element={ <CartPage cart={cartItems} resetCart={resetCart} /> } />
        <Route path='/clothing/*' element={ <ClothingPage handleClick={handleClick} loggedIn={loggedIn} /> }/>
        <Route path='/login' element={ <LoginPage />} />
        <Route path='/profile' element={ <ProfilePage user={user} /> } />
      </Routes>
    </>
  )
}