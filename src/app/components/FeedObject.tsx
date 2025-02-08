"use client"

import react, { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "./FeedObject.module.css";

export default function FeedObject({song} : {song: any}, (props: any)) {

    return(
        <div className={styles.feedObj} onClick={props.handleSongClick}>  
                <div className={styles.top}>
                    <p>{song.title}</p>
                    <p className={styles.right}>{song.username}</p> 
                </div>                
            <img src={song.song_file}></img>
        </div>
    )
}