import { useContext, useState } from "react"
import { FcAddImage } from "react-icons/fc"
import { MdAttachFile } from "react-icons/md"
import { ChatContext } from "../context/ChatContext"
import { AuthContext } from "../context/AuthContext"
import { arrayUnion, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useNavigate } from "react-router-dom"


const Input = () => {

    const navigate = useNavigate();
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)


    const handleSend = async () => {
        const randomId = crypto.randomUUID()
        if (img) {
            const storageRef = ref(storage, randomId)
            const uploadTask = uploadBytesResumable(storageRef, img)

            uploadTask.on(
                (error) => {
                    //setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: randomId,
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            })
                        })
                    })
                }
            )
        }
    }
    return (
        <div className="input">
            <input type="text" placeholder="Type something..." onChange={e => setImg(e.target.files[0])} />
            <div className="send">
                <MdAttachFile />
                <input style={{ display: "none" }} type="file"
                    name="file" id="file" />
                <label htmlFor="file">
                    <FcAddImage />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input
