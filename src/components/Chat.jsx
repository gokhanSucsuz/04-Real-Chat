import { BsThreeDots } from "react-icons/bs"
import { CiCamera } from "react-icons/ci"
import { IoPersonAdd } from "react-icons/io5"
import Messages from "./Messages"
import Input from "./Input"


const Chat = () => {
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>Jennifer</span>
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
