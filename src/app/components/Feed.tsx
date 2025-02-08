import react from "react";
import { useRouter } from 'next/navigation';
import styles from "./Feed.module.css";
import FeedObject from "./FeedObject"

export default function Feed() {
    return(
        <div className={styles.feedDiv}>
            <FeedObject />
        </div>
    )
}