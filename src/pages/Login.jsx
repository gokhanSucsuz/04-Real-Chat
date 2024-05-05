
export const Login = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="logo">
                    Real Chat
                </div>
                <div className="title">Login</div>
                <form>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                </form>
                <button>
                    Login
                </button>
                <p>You do not have an account? Register</p>
            </div>
        </div>
    )
}
