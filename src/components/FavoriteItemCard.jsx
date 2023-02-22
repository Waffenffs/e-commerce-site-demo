import '../App.css'
import { Link } from 'react-router-dom'

export default function FavoriteItemCard({ favoriteItem }){

    return(
            <div className="favoriteItemContainer">
                <div className="favoriteItemImageContainer">
                    <img src={favoriteItem.product_image} style={{ width: '100%'}}/>
                </div>
                <div>
                    <h1 className="favoriteItemTitle">{favoriteItem.product_name}</h1>
                </div>
                <div className="visit">
                    <Link to={`/clothing/${favoriteItem.product_name.split(' ').join('')}`} state={favoriteItem} className="profileVisit">
                        <h2>Visit</h2>
                    </Link>
                </div>
            </div>
    )
}