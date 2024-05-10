/* eslint-disable react/prop-types */

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    return
    // <div className="message owner">
    //     <div className="messageInfo">
    //         <img src={currentUser.photoURL} alt="" />
    //         <span>Just Now</span>
    //     </div>
    //     <div className="messageContent">
    //         <p>{data.message}</p>
    //         <img src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
    //     </div>
    // </div>

}

export default Message
