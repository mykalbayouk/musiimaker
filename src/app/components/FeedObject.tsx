"use client"

import react, { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "./FeedObject.module.css";

export default function FeedObject(props: any) {
    

    return(
        <div className={styles.feedObj} onClick={props.handleSongClick}>  
                <div className={styles.top}>
                    <p>Song Title</p>
                    <p className={styles.right}>Creator Name</p> 
                </div>                
            <img src={'https://wpe.hoffmanacademy.com/wp-content/uploads/2022/07/spring-example-copy-1024x665.jpg'}></img>
        </div>
    )
}