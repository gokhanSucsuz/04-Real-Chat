
export const Register = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="Logo">
                    Real Chat
                </div>
                <div className="title">Register</div>
                <form>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input type="file" />
                </form>
                <button>
                    Sign Up
                </button>
                <p>You do have an account? Login</p>
            </div>
        </div>
    )
}
