"use client"

import Navbar from "./components/Navbar";
import Feed from "./components/Feed"
import styles from "./page.module.css"
import { useState } from "react";
import SongModal from "./components/SongModal";

export default function Home() {
  const [viewSong, setViewSong] = useState(false);
  
      const toggleViewSong = () => {
          setViewSong(!viewSong);
      }
  
      const handleSongClick = () => {
          toggleViewSong()
          console.log(viewSong);
      }

      
  return (
    <div>
      <Navbar />
      <div className={styles.mainDiv}>
        <div></div>
        <Feed handleSongClick={handleSongClick}/>
        {viewSong ? <SongModal handleSongClick={handleSongClick}/> : <></>}
        <div></div>
      </div>
    </div>
  );
}
