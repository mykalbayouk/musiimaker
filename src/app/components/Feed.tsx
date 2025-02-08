"use client"

import react, { useState } from "react";
import { useRouter } from 'next/navigation';

import styles from "./Feed.module.css";
import FeedObject from "./FeedObject"
import SongModal from "./SongModal";

export default function Feed(props: any) {
    // const [viewSong, setViewSong] = useState(false);

    // const toggleViewSong = () => {
    //     setViewSong(!viewSong);
    // }

    // const handleSongClick = () => {
    //     toggleViewSong()
    //     console.log(viewSong);
    // }

    return(
        <div className={styles.feedDiv}>
            <FeedObject handleSongClick={props.handleSongClick}/>
            
        </div>
    )
}