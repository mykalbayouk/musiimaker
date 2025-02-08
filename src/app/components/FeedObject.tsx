import react from "react";
import { useRouter } from 'next/navigation';
import styles from "./FeedObject.module.css";

export default function FeedObject({song} : {song: any}) {
    return(
        <div className={styles.feedObj}>  
                <div className={styles.top}>
                    <p>{song.title}</p>
                    <p className={styles.right}>{song.username}</p> 
                </div>                
            <img src={song.song_file}></img>
        </div>
    )
}