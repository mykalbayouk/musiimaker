"use client"
import react from "react";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import styles from "./Feed.module.css";
import FeedObject from "./FeedObject"

export default function Feed() {
    const [title, setTitle] = useState("songTitlePlaceholder");
    const [username, setUsername] = useState('userNamePlaceHolder');
    const [song_file, setSongFile] = useState('https://wpe.hoffmanacademy.com/wp-content/uploads/2022/07/spring-example-copy-1024x665.jpg');
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        fetchFeed();
        console.log(feed)
    }, [])
    const uploadSong = async () => {
        try {
            const response = await fetch('http://localhost:2000/addSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    title: title,
                    username: username, 
                    song_file: song_file}),
            });
            const data = await response.json();
            if (response.ok) {
                window.alert('Added song successfully!');
            }
        } catch (err) {
            console.error(err);
        }
    }

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
    return(
        <div className={styles.feedDiv}>
            {feed.map((song, index) => (
                <FeedObject 
                    key={index}
                    song={song}
                />
            ))}
        </div>
    )
}