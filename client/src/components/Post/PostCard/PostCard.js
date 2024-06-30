import React, { useState } from "react";
import styles from './PostCard.module.css';
import { FaRegComment } from 'react-icons/fa';
import { useRouter } from "next/router";
import Comment from "@/components/Comment/Comment";
import { FaChevronUp } from 'react-icons/fa';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { htmlToText } from 'html-to-text';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function PostCard({ id, text, user }) {
    const [comments, setComments] = useState(false)
    const [newComment, setNewComment] = useState('');
    const [data, setData] = useState([]);
    const router = useRouter();
    async function handleOnClick() {
        try {
            const response = await fetch(`https://post-comment-chi.vercel.app/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: id }),
            });
            if (response.ok) {
                setData(await response.json());
            }
        }
        catch (error) {
            console.log('Error:', error);
        }
        setComments(!comments)

    }

    function handleInputChange(value) {
        setNewComment(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let token = localStorage.getItem('token')
        if (newComment.trim()) {
            try {
                const response = await fetch(`https://post-comment-chi.vercel.app/api/comments/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({ postId: id, text: newComment }),
                });
                if (response.status === 201) {
                    const post = await response.json();
                    setData([...data, post])
                }
                else {
                    // const errorData = await response.json();
                    alert("Error Occurred!");
                }

            }
            catch (error) {
                console.log('Error:', error);
            }
            // setData([...data, { text: newComment, user: "Ravi" }])
            setNewComment("")
        }
        else {
            alert("Type something to submit!")
        }
    }
    return (
        <div>
            <div className={styles["post-card-main-container"]}>
                <p className={styles["post-card-user"]} ><u>Posted by {user}</u></p>
                <p className={styles["post-card-text"]}>{text}</p>
            </div>
            {(!comments) ? (<div className={styles["post-card-bottom-container"]}><p className={styles["post-card-comment"]} onClick={handleOnClick}><b>Comment</b>  <FaRegComment size={20} color="black" /></p></div>) :
                (<div className={styles["post-card-user-comments"]}>
                    <hr style={{ margin: "0", border: "none", borderTopWidth: "2px", borderTopColor: "black", borderStyle: "solid" }} />
                    <p className={styles["post-card-comments-header"]}><u>Comments({data.length})</u></p>
                    {data.map((item) => (
                        <Comment text={item.text} user={item.user.email} />
                    ))}
                    <form onSubmit={handleSubmit} className={styles["post-card-comment-form"]}>
                        <ReactQuill
                            value={newComment}
                            onChange={handleInputChange}
                            className={styles["post-card-comment-input"]}
                            placeholder="Write a comment..."
                        />
                        {/* <input
                            type="text"
                            value={newComment}
                            onChange={handleInputChange}
                            className={styles["post-card-comment-input"]}
                            placeholder="Write a comment..."
                        /> */}
                        <button type="submit" className={styles["post-card-comment-button"]}>Submit</button>
                    </form>
                    <p className={styles["post-card-comments-close"]} onClick={handleOnClick}>Close  <FaChevronUp /></p>
                </div>)}
        </div>
    )
}