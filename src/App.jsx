import { Routes, Route, Link, useNavigate } from 'react-router-dom'
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
import { app } from './pages/LandingPage'
import { getFirestore} from 'firebase/firestore'
import { setDoc, doc, getDocs, getDoc, collection} from 'firebase/firestore'
import { signOut } from 'firebase/auth'

// initialize firestore
const db = getFirestore(app)

export default function App(){

  const [user, setUser] = useState(null)
  const [displayBar, setDisplayBar] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [favoriteItems, setFavoriteItems] = useState([])
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
        setDoc(doc(db, "users", `${user.email.split('@')[0]}`), {
          status: 'working'
        })

        setUser(user)
        setLoggedIn(true)
      } else {
        // logged out
        setLoggedIn(false)
      }
    })
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      setDoc(doc(db, "users", `${user.email.split('@')[0]}`), {
        cart: cartItems,
      })
    }
  }, [cartItems])

  const handleClick = (thisState) => {
    const clothingObject = {
      id: thisState.id,
      product_name: thisState.product_name,
      price: thisState.price,
      product_image: thisState.secondary_images[0]
    }
    
    setCartItems(prevState => [...prevState, clothingObject])

  }

  const handleFavorites = (thisState) => {
    const clothingObject = {
      id: thisState.id,
      product_name: thisState.product_name,
      price: thisState.price,
      product_image: thisState.secondary_images[0]
    }

    let clothingObjectAlreadyFavorited = false

    favoriteItems.map((item) => {
      if(item.id === clothingObject.id){
        clothingObjectAlreadyFavorited = true
      }
    })
    
    if(clothingObjectAlreadyFavorited === false){
      setFavoriteItems(prevState => [...prevState, clothingObject])
    }
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
            <>
              {!loggedIn && 
              <div className='navSideBarLoggedOut'>
                <Link className='sideBarLink' to="/login" onClick={() => setDisplayBar(false)}>
                  <div className="navSideBarLogin">Login</div>
                </Link>
                <div className="navSideBarContact">Contact</div>
              </div>
              }
              {loggedIn &&
              <div className='navSideBarLoggedIn'>
                <Link className='sideBarLink' to="/profile" onClick={() => setDisplayBar(false)}>
                  <div className="navSideBarLogin">Profile</div>
                </Link>
                <div className="navSideBarContact">Contact</div>
                <div className="navSideBarContact logout" onClick={() => {
                  signOut(auth)
                
                  setTimeout(() => {
                    navigate('/')
                  }, [])
                }}>Logout</div>
              </div>
              }
            </>
          }
      </nav> 

      <Routes>
        <Route path='/' element={ <LandingPage items={items} /> } />
        <Route path='/cart' element={ <CartPage cart={cartItems} resetCart={resetCart} /> } />
        <Route path='/clothing/*' element={ <ClothingPage handleClick={handleClick} loggedIn={loggedIn} handleFavorites={handleFavorites} /> }/>
        <Route path='/login' element={ <LoginPage />} />
        <Route path='/profile' element={ <ProfilePage user={user} favorites={favoriteItems} /> } />
      </Routes>
    </>
  )
}