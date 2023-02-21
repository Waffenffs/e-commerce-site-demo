import { app } from "./LandingPage"
import { GiLion } from 'react-icons/gi'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../App.css'

export const auth = getAuth(app)

export default function LoginPage(){
    const [displayPassword, setDisplayPassword] = useState(true)
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        
        signInWithEmailAndPassword(auth, signInEmail, signInPassword)
            .then((userCredential) => {
                // signed in
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            })
            .catch((error) => {
                // error with sign in
                console.log('error logging in: ', error)
            })
    }

    return(
        <div className="loginPageContainer">
            <form onSubmit={handleFormSubmit} className="loginPageForm">
                <div className="topLoginPart">
                    <GiLion className="loginLion" />
                    <h1>Sign in</h1>
                </div>
                <div className="loginPageInputContainer">
                    <div className="inputContainer">
                        <input 
                        type="email" 
                        className="loginPageInput" 
                        placeholder="Email" 
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}/>
                    </div>
                    <div className="inputContainer">
                        <input type={!displayPassword ? "text" : 'password'} 
                        className="loginPageInput" 
                        placeholder="Password"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}/>
                        {displayPassword && <AiOutlineEyeInvisible className="eye" onClick={() => setDisplayPassword(false)}/> }
                        {!displayPassword && <AiOutlineEye className="eye" onClick={() => setDisplayPassword(true)}/> }
                    </div>
                    <button className="loginPageButton">Sign in</button>
                    <div className="forgotPassword">
                        <h3>Forgot your password?</h3>
                    </div>
                </div>
            </form>
        </div>
    )
}