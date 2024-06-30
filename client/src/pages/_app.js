import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [Post, setPost] = useState(false)
  const [LoginStatus, setLoginStatus] = useState("Login");
  const [user,setUser]=useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    setLoginStatus(token ? "Logout" : "Login");
    setUser(localStorage.getItem('email'));
  },[])
  return( 
  <div style={{height:"100%"}}>
  <Head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
  </Head>
  <Navbar LoginStatus={LoginStatus} setLoginStatus={setLoginStatus} Post={Post} setPost={setPost} user={user} setUser={setUser}/>
  <Component {...pageProps} LoginStatus={LoginStatus} setLoginStatus={setLoginStatus} Post={Post} setPost={setPost} setUser={setUser}/>
  <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></Script>
   </div>)
}
