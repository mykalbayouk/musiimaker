"use client"

import { useState } from "react";
import Comment from "./Comment";
import { FaThumbsUp } from "react-icons/fa";
import CommentList from "./CommentList";

export default function SongModal(props: any) {
    const [comment, setComment] = useState("");
    const handleCommentChange = (event: any) => {
        setComment(event.target.value);
    }

    const handleCommentSubmit = (event: any) => {
        event.preventDefault()
        console.log(comment);
    }

    interface Comment {
        id: number,
        comment: String,
        username: String,
        profile: String
    }
    const comments: Comment[] = [
        {
            id: 1,
            comment: "Good song!",
            username: "as31",
            profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8FmZ_KM3vykoIAP2VeE-c1e4KUVduPQUHQ&s"
        },
        {
            id: 2,
            comment: "nice very nice",
            username: "michael",
            profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8FmZ_KM3vykoIAP2VeE-c1e4KUVduPQUHQ&s"
        },
        {
            id: 3,
            comment: "cool",
            username: "jack",
            profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8FmZ_KM3vykoIAP2VeE-c1e4KUVduPQUHQ&s"
        },
        {
            id: 4,
            comment: "wow",
            username: "lester",
            profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8FmZ_KM3vykoIAP2VeE-c1e4KUVduPQUHQ&s"
        },
        {
            id: 5,
            comment: "interesting!",
            username: "choi",
            profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8FmZ_KM3vykoIAP2VeE-c1e4KUVduPQUHQ&s"
        },
        {
            id: 6,
            comment: "very good piece",
            username: "aaron",
            profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8FmZ_KM3vykoIAP2VeE-c1e4KUVduPQUHQ&s"
        }
    ]
    return (
        <div className="bg-black bg-opacity-25 top-0 bottom-0 left-0 right-0 fixed flex items-center justify-center">
            <div className="border border-black bg-white w-11/12 h-11/12 flex flex-col">
                <div className="h-8 flex justify-end">
                    <button onClick={props.handleSongClick} className="border border-black p-1 rounded-full flex items-center"> X </button>
                </div>
                <div className="h-[584px]">
                    <div className="flex justify h-1/2">
                        <div className="border border-black w-1/12 flex items-center"><FaThumbsUp className="w-full" size={40}/></div>
                        <div className="border border-black w-11/12 overflow-y-scroll"><img className="w-full" src="https://wpe.hoffmanacademy.com/wp-content/uploads/2022/07/spring-example-copy-1024x665.jpg"/></div>
                    </div>
                    <div className="h-1/2">
                        <div>
                            <h1 className="font-bold">Comments</h1>
                            <CommentList comments={comments} />
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