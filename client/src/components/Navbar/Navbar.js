import React, { useState, useReducer, useContext, useEffect } from "react"
import styles from "./Navbar.module.css"
import { useRouter } from 'next/router';
import { FiLogOut } from "react-icons/fi";
// import { DarkModeContext } from "../../context/DarkModeContext";

export default function Navbar({ LoginStatus, setLoginStatus, setPost, user, setUser }) {
    const router = useRouter();
    // const theme = useContext(DarkModeContext)
    // const [mounted, setMounted] = useState(false);
    // useEffect(() => {
    //   setMounted(true);
    // }, []);

    function handlePost() {
        let token = localStorage.getItem("token")
        if (!token) {
            alert("User Not Logged in!")
        }
        else {
            setPost(true)
        }
    }

    function handleLogout() {
        if (localStorage.getItem("token")) {
            localStorage.removeItem('token');
            localStorage.removeItem('email')
        }
        if (LoginStatus === "Logout") {
            setLoginStatus('Login')
            setUser(null)
            setPost(false)
        }
        router.push("/login")
    }



    let mainColour, cardColour, textColour, navBar;
    // if (theme === "Light") {
    //     mainColour = { color: "rgba(255,255,255,0.6)" }
    //     //navBar= {padding: "0px"}
    // }
    // if (!mounted) return <></>;
    return (
        <nav style={{ height: "7.65vh"}} className="navbar navbar-expand-lg bg-body-tertiary" >
            <div className="container-fluid" style={mainColour}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles["header-item-list"]}`}>
                        <li className="nav-item">
                            <button onClick={handlePost} className="btn btn-success mx-2" >Post</button>
                        </li>
                        <li className={`nav-item ${styles["post-comment"]}`}>Post-Comment</li>
                        {(LoginStatus === "Login") ?
                            (<li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-success mx-2" >Login</button>
                            </li>) :
                            (<li className="nav-item">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user}
                                </a>
                                <ul className={`dropdown-menu dropdown-menu-end ${styles["logout"]}`}>
                                    <li><a className="dropdown-item" onClick={handleLogout} >Logout <FiLogOut style={{color:"red"}}/> </a></li>
                                </ul>
                            </li>)}
                        {/* <li className="nav-item">
                            <button onClick={() => handleTheme(theme)} className="btn btn-success mx-2" >{`${theme} mode`}</button>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}   