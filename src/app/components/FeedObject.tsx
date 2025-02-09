"use client"

import react, { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "./FeedObject.module.css";

export default function FeedObject(props: any) {

    return(
        <div className={styles.feedObj} onClick={() => props.handleSongClick(props.song._id)}>  
                <div className={styles.top}>
                    <p>{props.song.title}</p>
                    <p className={styles.right}>{props.song.username}</p> 
                </div>                
            <img src={props.song.song_file}></img>
        </div>
    )
}