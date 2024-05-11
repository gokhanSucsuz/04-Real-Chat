import { useContext, useEffect, useState } from "react"
import Message from "./Message"
import { ChatContext } from "../context/ChatContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

const Messages = () => {
    const { data } = useContext(ChatContext)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub();
        }
    }, [data.chatId])
    return (
        <div className="messages">
            {
                messages?.map((message, index) =>
                    <Message key={index} message={message} />
                )
            }
        </div>
    )
}

export default Messages