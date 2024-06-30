import Post from "@/components/Post/Post";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function PostPage(props){
    const router=useRouter();
    useEffect(()=>{
        let token=localStorage.getItem("token")
        if (!token){
            router.push('/login')
        }
    })
    return <Post {...props}/>
}

// export default Post;

