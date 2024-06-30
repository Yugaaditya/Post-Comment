import React, { useEffect, useRef, useState } from "react";
import styles from './Post.module.css';
import PostCard from "./PostCard/PostCard";

export default function Post({ Post, setPost }) {
    const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    // [{ text }, { text }, { text }, { text }, { text }, { text }, { text }, { text }, { text }, { text }, { text }]
    const [data, setData] = useState([])
    const [newPost, setNewPost] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const offset = useRef(0);
    // console.log(data);
    useEffect(() => {
        var objTable = document.getElementById("main-container");
        objTable.addEventListener("scroll", handleScroll);
        const fetchData = async () => {
            try {
                const response = await fetch(`https://post-comment-chi.vercel.app/api/post?offset=${offset.current}&limit=50`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    setData(await response.json());
                }
            }
            catch (error) {
                console.log('Error:', error);
            }
        }
        fetchData();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const handleScroll = () => {
        const objTable = document.getElementById("main-container");
        if (objTable.scrollTop + objTable.clientHeight >= objTable.scrollHeight - 2) {
            const fetchData = async () => {
                try {
                    // console.log(offset)
                    const response = await fetch(`https://post-comment-chi.vercel.app/api/post?offset=${offset.current+50}&limit=50`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response.ok) {
                        const newData = await response.json();
                        // setOffset(prev => prev + 5);
                        offset.current+=50;
                        if (newData.length===0){
                            offset.current-=50;
                        }
                        
                        setData(prevData => [...prevData, ...newData]);
                        console.log(data, offset)
                    }
                }
                catch (error) {
                    console.log('Error:', error);
                }
            }
            fetchData();
        }
    };

    const handleInputChange = (e) => {
        setNewPost(e.target.value);
    };

    const handleBold = () => {
        setIsBold(!isBold);
    };

    const handleItalic = () => {
        setIsItalic(!isItalic);
    };

    const handleUnderline = () => {
        setIsUnderline(!isUnderline);
    };

    const handlePostSubmit = async (event) => {
        // Logic to handle post submission
        event.preventDefault();
        let token = localStorage.getItem('token')
        if (newPost.trim()) {
            try {
                const response = await fetch(`https://post-comment-chi.vercel.app/api/post/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({ content: newPost }),
                });
                if (response.status === 201) {
                    const post = await response.json();
                    setData([post, ...data])
                }
                else {
                    // const errorData = await response.json();
                    alert("Error Occurred!");
                }

            }
            catch (error) {
                console.log('Error:', error);
            }
            // setData([{ text: newPost }, ...data])
            setPost(false); // Example logic to set the new post
            setNewPost(''); // Clear the input
        }
        else {
            alert("Type something to submit!")
        }
    };

    const handlePostCancel = () => {
        // Logic to handle post submission
        setPost(false); // Example logic to set the new post
        setNewPost(''); // Clear the input
    };

    const textareaStyle = {
        fontWeight: isBold ? 'bold' : 'normal',
        fontStyle: isItalic ? 'italic' : 'normal',
        textDecoration: isUnderline ? 'underline' : 'none',
    };
    let prop = { height: "92.35vh", overflowY: "auto" };
    if (Post) {
        prop = { ...prop, backgroundColor: "beige" };
    }
    return (
        <div id="main-container" style={prop}>
            {(!Post) ?
                (data.map((item) => (
                    <PostCard id={item._id} text={item.content} user={item.user.email} />
                ))) : <div className={styles["post-card-bottom-container"]}>
                    <div className={styles["formattingButtons"]}>
                        <button onClick={handleBold} className={isBold ? styles["active"] : ''}>B</button>
                        <button onClick={handleItalic} className={isItalic ? styles["active"] : ''}>I</button>
                        <button onClick={handleUnderline} className={isUnderline ? styles["active"] : ''}>U</button>
                    </div>
                    <textarea
                        value={newPost}
                        onChange={handleInputChange}
                        style={textareaStyle}
                        className={styles["textarea"]}
                        placeholder="Write your post here..."
                    />
                    <div className={styles["submit-back-buttons"]}>
                        <button onClick={handlePostCancel} className={styles["back-button"]}>Back</button>
                        <button onClick={handlePostSubmit} className={styles["submitButton"]}>Submit</button>
                    </div>
                </div>}
        </div>
    )
}