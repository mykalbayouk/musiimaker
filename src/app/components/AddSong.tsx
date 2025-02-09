"use client"

import Navbar from "./Navbar";
import { useState } from "react";
export default function AddSong() {
    interface Song {
        //username: String,
        title: String,
        instrument: String,
        file: any
    }
    const [title, setTitle] = useState("");
    const [instrument, setInstrument] = useState("");
    const [file, setFile] = useState("");

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    }
    const handleInstrumentChange = (event: any) => {
        setInstrument(event.target.value);
    }
    const handleFileChange = (event: any) => {
        setFile(event.target.value);
    }
    const handleUpload = async (event: any) => {
        event.preventDefault();
        const song: Song = {
            title: title,
            instrument: instrument,
            file: "https://www.davidsides.com/cdn/shop/files/01.Twinkle_Twinkle_LittleStar_Page_1_707f2ff7-8eb8-47a4-b055-bea4fc58ff84.png?v=1704573370"
        }
       console.log(song)
       const token = localStorage.getItem('token');
       if (!token) {
        window.alert('You must be logged in to upload a song');
        return;
       }
        try {
            const response = await fetch('http://localhost:2000/addSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    title: title,
                    instrument: instrument,
                    file: file}),
            });
            const data = await response.json();
            if (response.ok) {
                window.alert('Added song successfully!');
            }
        } catch (err) {
            console.error(err);
        }
    }

    
    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center h-[780px] w-full"> 
                <div className="h-[400px] w-[400px] flex flex-col justify-center items-center border border-black rounded-[20px]">
                    <h1 className="text-2xl w-1/4 text-center h-[50px] flex items-center">Add Song</h1>
                    <form className="h-[300px] flex flex-col w-[390px] items-center justify-center">
                        <input onChange={handleTitleChange} type="text" placeholder="Title" className="border-b border-b-black outline-none m-2 w-[200px] transition duration-300 focus:shadow-[0_3px_3px_black] h-[35px] p-2 " />
                        <input onChange={handleInstrumentChange} type="text" placeholder="Instrument" className="border-b border-b-black outline-none m-2 w-[200px] transition duration-300 focus:shadow-[0_3px_3px_black] h-[35px] p-2" />
                        <input type="file" placeholder="password" className=" m-2 w-[200px]  h-[35px] p-2" />
                        <button onClick={handleUpload} type="submit" className="border border-black p-2 rounded-full transition duration-150 hover:shadow-[0_3px_3px_black] m-2" >Upload</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}