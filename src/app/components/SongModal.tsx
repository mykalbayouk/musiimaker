import React, { use, useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CommentList from './CommentList';
import jwt, { JwtPayload } from 'jsonwebtoken';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: '#3E3A47',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column'
};

interface Comment {
    id: number;
    comment: string;
    username: string;
    profile: string;
}



export default function SongModal(props: any) {
    let commentCreate = '';
    let decodedToken: JwtPayload | null = null;
    let profilePic = '';
    const token = localStorage.getItem('token');
    const [commentsState, setComments] = useState<Map<number, Comment>>(new Map());


    if (!token) {
        console.error('No token found');
    } else {
        try {
            decodedToken = jwt.decode(token) as JwtPayload;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }

    
    useEffect(() => {
        if (!decodedToken) return;
        const getProfile = async () => {
            try {
                const response = await fetch("http://localhost:2000/getCurrentUser", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to get profile');
                }

                const data = await response.json();
                profilePic = data.picture;
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        setComments(props.commentsDB);
        getProfile();
    }, [decodedToken, token]);

    console.log("comments state: " + commentsState);
    

    const handleCommentSubmit = async (event: any) => {
        event.preventDefault();
        
        

        const comment: Comment = {
            id: commentsState ? commentsState.size : 0,
            comment: commentCreate,
            username: decodedToken?.username || 'Anonymous',
            profile: profilePic
        };

        const commentMap = new Map(commentsState);
        commentMap.set(comment.id, comment);
        setComments(commentMap);
        
        const obj = Object.fromEntries(commentMap);
        const json = JSON.stringify(obj);
        
        try {
            const response = await fetch(`http://localhost:2000/updateSong/${props.songId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: json
            });

            if (!response.ok) {
                throw new Error('Failed to update comment');
            }

            const data = await response.json();
            console.log(commentsState)
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <Modal
            open={props.open}
            onClose={props.handleSongClick}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <div className="flex h-full">
                    <div className="w-2/3 flex flex-col p-4">
                        <div className="flex-grow overflow-y-auto">
                            <CommentList comments={commentsState} />
                        </div>
                        <form className="flex mt-4" onSubmit={handleCommentSubmit}>
                            <input
                                type="text"
                                placeholder="Leave a comment..."
                                className="border border-gray-300 rounded-l-md p-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => {
                                    commentCreate = event.target.value;
                                }}
                            />
                            <button
                                type="submit"
                                className="bg-gray-500 text-white rounded-r-md p-2 w-1/5 hover:bg-blue-600"
                            >
                                Post
                            </button>
                        </form>
                    </div>
                    <div className="w-1/2 flex items-center justify-center border-l border-l-black">
                        <embed
                            src={URL.createObjectURL(props.file)}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            </Box>
        </Modal>
    );
}