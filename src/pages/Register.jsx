import { MdOutlineAddPhotoAlternate } from "react-icons/md"

export const Register = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="logo">
                    Real Chat
                </div>
                <div className="title">Register</div>
                <form>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <MdOutlineAddPhotoAlternate className="imageIcon" />
                        Add an avatar
                    </label>
                </form>
                <button>
                    Sign Up
                </button>
                <p>You do have an account? Login</p>
            </div>
        </div>
    )
}
