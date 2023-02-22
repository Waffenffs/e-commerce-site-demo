import FavoriteItemCard from "../components/FavoriteItemCard"

export default function ProfilePage({ user, favorites}){
    /* 
    PROFILE PAGE
    1. Add favorites
    2. Account history or something
    3. Lets go baby
    */

    const favoriteItems = favorites.map((favoriteItem) => {
        return(
            <FavoriteItemCard favoriteItem={favoriteItem} />
        )
    })

    return(
        <div className="profilePageContainer">
            <div className="imageAndEmail">
                <div className="greetUser">
                    <h1 className="greetUser">Hello, {user.email}</h1>
                </div>
            </div>
            
            <div className="favoritesSection">
                <div className="favoriteTitleContainer">
                    <h1 className="favoritesTitle">My Favorites</h1>
                </div>
                <div className="favoriteItemsContainer">
                    {favoriteItems}
                </div>
            </div>
        </div>
    )
}