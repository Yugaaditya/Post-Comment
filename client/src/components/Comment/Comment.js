import React from "react";
import styles from './Comment.module.css';

export default function Comment({text,user}){
    return(
        <div className={styles["comment-container"]}>
            <p className={styles["comment-user"]}><i><u>{user}</u></i></p>
            <p className={styles["comment-text"]} dangerouslySetInnerHTML={{ __html: text }}/>
            <hr/>
        </div>
    )
}