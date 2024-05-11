/* eslint-disable react/prop-types */

import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const convertDate = (timestamp) => {
        let dateInMillis = timestamp * 1000
        let date = new Date(dateInMillis)
        let myTime = date.toLocaleTimeString()
        return myTime
    }

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    return (<div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
            <span>{convertDate(message.date)}</span>
        </div>
        <div className="messageContent">
            <p>{message.text}
            </p>
            {message.img && <img src={message.img} alt="" />}

        </div>
    </div>)

}

export default Message
