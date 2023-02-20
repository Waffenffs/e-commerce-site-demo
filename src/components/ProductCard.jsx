import { useState } from "react"
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import {Link} from 'react-router-dom'
import '.././App.css'

export default function ProductCard({ productName, mainImage, secondaryImages, clothingData }){
    const [currentImageNumber, setCurrentImageNumber] = useState(null)
    const [displayed, setIsDisplayed] = useState(false)

    const handleLeftArrowClick = () => {
        if(currentImageNumber === null){
            setCurrentImageNumber(secondaryImages.length-1)
        } else if(currentImageNumber-1 < 0){
            setCurrentImageNumber(null)
        } else {
            setCurrentImageNumber(prevState => prevState - 1)
        }
    }

    const handleRightArrowClick = () => {
        if(currentImageNumber === null){
            setCurrentImageNumber(secondaryImages.length-1)
        } else if(currentImageNumber+1 < secondaryImages.length){
            setCurrentImageNumber(null)
        } else {
            setCurrentImageNumber(prevState => prevState - 1)
        }
    }

    return(
        <div className="productCardContainer"
            onMouseEnter={() => setIsDisplayed(true)}
            onMouseLeave={() => setIsDisplayed(false)}>
            <div className="productImageContainer">
                <div className="arrow">
                    {displayed && <BiLeftArrow className="arrowPointer" onClick={handleLeftArrowClick}/>}
                </div>
                <div className="productImgContainerContainer">
                    <img className="productImage" src={currentImageNumber === null ? mainImage : secondaryImages[currentImageNumber]}/>
                </div>
                <div className="arrow">
                    {displayed && <BiRightArrow className="arrowPointer" onClick={handleRightArrowClick} />}
                </div>
            </div>
            <div className="productTitleContainer">
                <Link className="link" to={`/clothing/${productName.split(' ').join('')}`} state={clothingData}>
                    <h2>{productName}</h2>
                </Link>
            </div>
        </div>
    )
}