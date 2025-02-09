"use client"

import Navbar from "./components/Navbar";
import Feed from "./components/Feed"
import styles from "./page.module.css"
import { useState, useEffect } from "react";
import SongModal from "./components/SongModal";
import { stringToPdf } from "./util/base64toPdf";

interface Comment {
  id: number;
  comment: string;
  username: string;
  profile: string;
}

export default function Home() {
  const [viewSong, setViewSong] = useState(false);
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [pdfFile, setPdfFile] = useState("");
  const [songId, setSongId] = useState("");

  const [commentsDB, setCommentsDB] = useState<any>(null);

  const toggleViewSong = () => {
    setViewSong(!viewSong);
  }

  const handleSongClick = async (id: any) => {
    toggleViewSong();
    setSongId(id);
    try {
      const res = await fetch(`http://localhost:2000/getSong/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setPdfFile(data.file);
      setCommentsDB(data.comment);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('http://localhost:2000/getSongs', {
          method: 'GET',
        });
        const data = await res.json();
        setSongs(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSongs();
  }, []);
  const file = stringToPdf(pdfFile);
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Navbar />
      <div className={styles.mainDiv}>
        <div></div>
        <Feed handleSongClick={handleSongClick} songs={songs} />
        {viewSong && (
          <SongModal open={viewSong} handleSongClick={toggleViewSong} file={file} comment={commentsDB} songId={songId} />
        )}
        <div></div>
      </div>
    </div>
  );
}
