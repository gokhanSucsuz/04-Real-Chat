import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";

export const Login = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Real Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input required type="email" placeholder="email" />
                    <input required type="password" placeholder="password" />
                    <button disabled={loading}>Login</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You do not have any account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};
