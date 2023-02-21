export default function ProfilePage({ user }){
    /* 
    PROFILE PAGE
    1. Add favorites
    2. Account history or something
    3. Lets go baby
    */

    console.log(user.email)

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
            </div>
        </div>
    )
}