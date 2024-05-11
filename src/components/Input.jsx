/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { FcAddImage } from "react-icons/fc"
import { MdAttachFile } from "react-icons/md"
import { ChatContext } from "../context/ChatContext"
import { AuthContext } from "../context/AuthContext"
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"


const Input = () => {
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)


    const handleSend = async () => {
        if (img) {
            const storage = getStorage()
            const storageRef = ref(storage, crypto.randomUUID())
            const uploadTask = uploadBytesResumable(storageRef, img)

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log(downloadURL)
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: crypto.randomUUID(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        })
                    })
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: crypto.randomUUID(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [`${data.chatId}.lastMessage`]: {
                text
            },
            [`${data.chatId}.date`]: Timestamp.now()
        })
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [`${data.chatId}.lastMessage`]: {
                text
            },
            [`${data.chatId}.date`]: Timestamp.now()
        })


        setText("")
        setImg(null)
    }
    return (
        <div className="input">
            <input type="text" placeholder="Type something..." onChange={e => setText(e.target.value)} value={text} />
            <div className="send">
                <MdAttachFile />
                <input style={{ display: "none" }} type="file"
                    name="file" id="file" onChange={e => setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <FcAddImage />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input
