import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export const Register = () => {

    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];


        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            );

        } catch (error) {

        }

    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="logo">
                    Real Chat
                </div>
                <div className="title">Register</div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <MdOutlineAddPhotoAlternate className="imageIcon" />
                        Add an avatar
                    </label>

                    <button>
                        Sign Up
                    </button>
                    {
                        err && <span>Something went wrong!</span>
                    }
                    <p>You do have an account? Login</p>
                </form>
            </div>
        </div>
    )
}
