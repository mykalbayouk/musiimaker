"use client"
import react from "react";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import styles from "./Feed.module.css";
import FeedObject from "./FeedObject"

export default function Feed() {
    const [title, setTitle] = useState("songTitlePlaceholder");
    const [userName, setUserName] = useState('userNamePlaceHolder');
    const [song_file, setSongFile] = useState('https://wpe.hoffmanacademy.com/wp-content/uploads/2022/07/spring-example-copy-1024x665.jpg');
    
    useEffect(() => {
    }, [])
    const uploadSong = async () => {
        console.log(title);
        try {
            const response = await fetch('http://localhost:2000/addSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    title: title,
                    userName: userName, 
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
    return(
        <div className={styles.feedDiv}>
            <FeedObject />
        </div>
    )
}