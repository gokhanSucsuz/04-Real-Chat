import { BsThreeDots } from "react-icons/bs"
import { CiCamera } from "react-icons/ci"
import { IoPersonAdd } from "react-icons/io5"
import Messages from "./Messages"
import Input from "./Input"
import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"


const Chat = () => {
    const { data } = useContext(ChatContext)
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <CiCamera className="icon" />
                    <IoPersonAdd className="icon" />
                    <BsThreeDots className="icon" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat
