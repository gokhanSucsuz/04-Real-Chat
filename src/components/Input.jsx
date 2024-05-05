import { FcAddImage } from "react-icons/fc"
import { MdAttachFile } from "react-icons/md"


const Input = () => {
    return (
        <div className="input">
            <input type="text" placeholder="Type something..." />
            <div className="send">
                <MdAttachFile />
                <input style={{ display: "none" }} type="file"
                    name="file" id="file" />
                <label htmlFor="file">
                    <FcAddImage />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input
