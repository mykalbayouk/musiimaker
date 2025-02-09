"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { SubmitButton } from "@/app/components/custom/SubmitButton";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import Image from "next/image";

interface ProfileFormProps {
    id: string;
    username: string;
    email: string;
    credits: number;
}

export function ProfileForm({
    data,
    className,
}: {
    readonly data: ProfileFormProps;
    readonly className?: string;
}) {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [id, setId] = useState()
    const [profilePictureURL, setProfilePictureURL] = useState("https://images.pexels.com/photos/104084/pexels-photo-104084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
    let newPicture: String = "";
   
    const handlePictureURLChange = (event: any) => {
        setProfilePictureURL(event.target.value)
    }
    const handleProfileUpdate = (event: any) => {
        
        const updateProfile = async() => {
            const response = await (fetch("http://localhost:2000/updateProfile", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    
                    newPictureURL: newPicture,
                    userId: id
                })
            }))
            
            const data = await response.json()
            if (response.ok) {
                window.alert("Profile updated successfully")
            }
        }
        updateProfile()
    }

    const token = localStorage.getItem("token");
    
    useEffect(() => {
        try {
            const getUser = async() => {
                const response = await fetch("http://localhost:2000/getCurrentUser", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error(errorData.message || 'Failed to fetch songs');
                } 
                const data = await response.json();
                setUsername(data.username);
                setEmail(data.email);
                setId(data._id);
                setProfilePictureURL(data.picture)
                console.log(data)

            };
            getUser();
            setLoading(false);
        } catch (err) {
            console.error("Error", err);
        }
    }, [])

    if (loading){
        return <div>Loading</div>
    }
    return (
        <form className={cn("space-y-4", className)}>
            <div className="space-y-4 grid">
                <div className="grid grid-cols-3 gap-4">
                    <Input
                        id="username"
                        name="username"
                        placeholder={username || ""}
                        defaultValue={data?.username || ""}
                        disabled />
                    <Input
                        id="email"
                        name="email"
                        placeholder={email || ""}
                        defaultValue={data?.email || ""}
                        disabled />
                    <img 
                        src={profilePictureURL}
                        alt="Profile Picture"
                        className="rounded-full border w-[100px] h-[100px]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input id="picture" name="picture" placeholder="Picture URL" onChange={(event) => newPicture = event.target.value } />
                </div>
            </div>

            <div className="flex justify-end">
                <SubmitButton onClick={handleProfileUpdate} text="Update Profile" loadingText="Saving Profile" />
            </div>
        </form>
    )
    }