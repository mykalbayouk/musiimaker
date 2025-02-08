"use client"

import { useState } from "react";

export default function SongModal(props: any) {
    const [comment, setComment] = useState("");
    const handleCommentChange = (event: any) => {
        setComment(event.target.value);
    }
    
    const handleCommentSubmit = (event: any) => {
        event.preventDefault()
        console.log(comment);
    }
    return (
        <div className="bg-black bg-opacity-25 top-0 bottom-0 left-0 right-0 fixed flex items-center justify-center">
            <div className="border border-black bg-white w-3/4 h-3/4 flex flex-col">
                <div className="h-8 flex justify-end">
                    <button onClick={props.handleSongClick} className="border border-black p-1 rounded-full flex items-center"> X </button>
                </div>
                <div className="h-[584px]">
                    <div className="flex justify h-3/4">
                        <div className="border border-black">interactions</div>
                        <div className="border border-black w-5/6">sheet music</div>
                    </div>
                    <div>
                        <div>
                            <h1 className="font-bold">Comments</h1>
                            <div className="italic">comments here</div>
                            <div className="flex border border-black">
                                <input type="text" placeholder="Leave a comment..." className="border-b border-b-black w-4/5" onChange={handleCommentChange}></input>
                                <button type="submit" onClick={handleCommentSubmit} className="border border-black flex items-center">&#8594;</button>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}