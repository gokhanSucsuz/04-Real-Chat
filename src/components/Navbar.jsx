import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className="navbar">
            <div className="logo">
                Real Chat
            </div>
            <div className="user">
                <img src={currentUser.photoUrl} alt="" />
                <div>{currentUser.displayName}</div>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
