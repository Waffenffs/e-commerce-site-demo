import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs'
import '../App.css'

export default function ClothingPage({ handleClick, loggedIn, handleFavorites }){
    const location = useLocation()
    const state = location.state

    return(
        <div className="clothingPageContainer">
            <div className="clothingPageImageContainer">
                <img src={state.main_image || state.product_image} className="clothingPageImage"/>
            </div>
            <div className="transactionContainer">
                <div className='productTitleContainer' style={{ justifyContent: 'flex-start'}}>
                    <h2 className="productPageName">{state.product_name}</h2>
                </div>
                <div className="price">
                    <h3 className='priceTag'>{state.price}</h3>
                </div>
                <div className="clothingParaContainer">
                    <p className="clothingPara">{state.description}</p>
                </div>
                {!loggedIn && 
                <div className='bottomSection'>
                    <Link to="/login" className='cartLink'>
                        <BsBookmark className='bookMark'/>
                    </Link>
                    <Link to='/login' className="cartLink">
                        <div className="buttonContainer">
                            <button className="checkout" onClick={() => handleClick(state)}>
                                Add to Cart
                            </button>
                        </div>
                    </Link>
                </div>}
                {loggedIn && 
                <div className='bottomSection'>
                    <BsBookmark className='bookMark' onClick={() => handleFavorites(state)}/>
                    <div className="buttonContainer">
                        <button className="checkout" onClick={() => handleClick(state)}>
                            Add to Cart
                        </button>
                    </div>
                </div>}
                
            </div>
        </div>
    )
}