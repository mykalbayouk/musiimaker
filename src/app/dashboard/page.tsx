"use client"
import { useState, useEffect } from 'react';
import FeedObject from '../components/FeedObject'
import SongModal from '../components/SongModal'
export default function DashBoardRoute() {
    const [viewSong, setViewSong] = useState(false);
    const toggleViewSong = () => {
        setViewSong(!viewSong);
    }
  
    const handleSongClickDash = () => {
        toggleViewSong()
        console.log(viewSong);
    }
    
    const [grid, setGrid] = useState([]);

    useEffect(() => {
            fetchCurrentUserSongs();
        }, [])
    const fetchCurrentUserSongs = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:2000/getCurrentUserSongs', {
                method: 'GET',
                headers: { 
                    Authorization: `Bearer ${token}`, 
                }, 
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData.message || 'Failed to fetch songs');
            } 
            const data = await response.json();
            setGrid(data);
        } catch (err) {
            console.error('Error fetching songs: ', err)
        }
    }

    return (
        <div className="grid grid-cols-3 items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            {grid.map((song, index) => (
                <FeedObject 
                    key={index}
                    song={song}
                    handleSongClick={handleSongClickDash}
                />
                
            ))}
            {viewSong ? <SongModal handleSongClick={handleSongClickDash}/> : <></>}
        </div>
    )
}