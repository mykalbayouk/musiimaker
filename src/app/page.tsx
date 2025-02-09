"use client"

import Navbar from "./components/Navbar";
import Feed from "./components/Feed"
import styles from "./page.module.css"
import { useEffect, useRef, useState } from "react";
import SongModal from "./components/SongModal";

export default function Home() {
  const [viewSong, setViewSong] = useState(false);
  const [comments, setComments] = useState([]);
      const toggleViewSong = () => {
        setViewSong(!viewSong);
      }
  
      const handleSongClick = async (id: any) => {
          toggleViewSong()
          console.log(id)
          try {
            // const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:2000/getSong/${id}`, {
              method: "GET",
            })
            const data = await res.json();
            console.log(data)
            //setComments(data.comments);
          } catch(err) {
            console.error(err)
          }
      }

  return (
    <div>
      <Navbar />
      <div className={styles.mainDiv}>
        <div></div>
        <Feed handleSongClick={handleSongClick}/>
        {viewSong ? <SongModal handleSongClick={handleSongClick} comments={comments}/> : <></>}
        <div></div>
      </div>
    </div>
  );
}
