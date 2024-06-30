import React, { useContext, useState } from "react";
import styles from './Login.module.css';
import { useRouter } from 'next/router';
// import { DarkModeContext } from "../../context/DarkModeContext";
import Image from "next/image";

export default function Login({ setLoginStatus, setUser }) {
    // const theme = useContext(DarkModeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://post-comment-chi.vercel.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.status == 200) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('email',email)
                alert(data.message);
                router.push("/home");
                console.log(setLoginStatus)
                setUser(email)
                setLoginStatus("Logout");
            } else if (response.status == 401) {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    let mainColour, cardColour;
    // if (theme === "Light") {
    //     mainColour = { backgroundColor: "black", color: "white" };
    //     cardColour = { backgroundColor: "rgba(48, 45, 48, 0.938)", boxShadow: "0px 0px 4px 4px rgba(192, 192, 192, 0.3)" };
    // }

    return (
        <div className={styles["login-container"]} style={mainColour}>
            <div className={styles["login-form"]} style={cardColour}>
                <img className={styles["login-form-image"]} src="/Logo.png" />
                <div className={styles["login-text"]}>
                    <h3>Enter your login details</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className={styles["input-email"]}
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="password"
                        className={styles["input-password"]}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit" className={styles["submit-button"]}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
