import '../App.css'
import ProductCard from '.././components/ProductCard'

export default function LandingPage({ items }){
    const products = items.map((item) => {
        return <ProductCard 
        productName={item.product_name}
        mainImage={item.main_image}
        secondaryImages={item.secondary_images}
        clothingData={item}
        />
    })

    return(
        <div className="landingPage">
            <div className="mainProduct">
                <div className="mainImgContainer">
                    <img src="https://balenciaga.dam.kering.com/m/52b6e28d217f2986/Large-HB-Balenciaga_garde_robe_campaign_Look13_2600x1016.jpg" className='mainItemImage'/>
                </div>
                
            </div>

            <div className="bigTextContainer">
                <h1 className="bigText">
                    LATEST DEALS
                </h1>
            </div>

            <div className="productsContainer">
                {products}
            </div>
        </div>
    )
}