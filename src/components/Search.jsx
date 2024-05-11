import { query } from "firebase/database"
import { collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc, where } from "firebase/firestore"
import { useContext, useState } from "react"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"

const Search = () => {

    const { currentUser } = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username))

        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (error) {
            setErr(true)
        }
    }

    const handleKeyDown = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] })


                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [`${combinedId}.date`]: Timestamp.now(),
                })
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [`${combinedId}.date`]: Timestamp.now(),
                })
            }
        } catch (error) {
            setErr(error)
        }

        setUser(null)
        setUsername("")
    }

    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Find a user" onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={username}
                />
            </div>
            {err && <span>User not found!</span>}
            {
                user && <div className="userChat" onClick={handleSelect}>
                    <img src={user?.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user?.displayName}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search