"use client"

"use client"
import react, { useState, useEffect } from "react";

import { useRouter } from 'next/navigation';

import styles from "./Feed.module.css";
import FeedObject from "./FeedObject"
import SongModal from "./SongModal";

export default function Feed(props: any) {
   
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        fetchFeed()
    }, [])
    

    const fetchFeed = async () => {
        try {
            const response = await fetch('http://localhost:2000/getSongs', {
                method: 'GET',            
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData.message || 'Failed to fetch songs');
            } 
            const data = await response.json();
            setFeed(data);
        } catch (err) {
            console.error('Error fetching songs: ', err)
        }
    }

    

    const fetchSpecificUserSongs = async (username: String) => {
        try {
            const response = await fetch(`http://localhost:2000/getSongs/${username}`, {
                method: 'GET',
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData.message || 'Failed to fetch songs');
            } 
            const data = await response.json();
            setFeed(data);
        } catch (err) {
            console.error('Error fetching songs: ', err)
        }
    }

    return(
        <div className={styles.feedDiv}>
            {feed.map((song, index) => (
                <FeedObject 
                    key={index}
                    song={song}
                    handleSongClick={props.handleSongClick}
                />
            ))}
            
        </div>
    )
}