"use client"

import { useState } from "react";
import Navbar from "./Navbar";

export default function Signup() {
    interface User {
        username: String,
        email: String,
        password: String
    }
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }
    const onSignup = (event: any) => {
        event.preventDefault()
        const user: User = {
            username: username,
            email: email,
            password: password            
        }
        console.log(user);
    }
    return (
        <div className="h-[830px]">
            <Navbar />            
            <div className="flex justify-center items-center h-[780px] w-full"> 
                <div className="h-[400px] w-[400px] flex flex-col justify-center items-center border border-black rounded-[20px]">
                    <h1 className="text-2xl w-1/4 text-center h-[50px] flex items-center">Sign Up</h1>
                    <form className="h-[300px] flex flex-col w-[390px] items-center justify-center">
                        <input type="text" placeholder="username" className="border-b border-b-black outline-none m-2 w-[200px] transition duration-300 focus:shadow-[0_3px_3px_black] h-[35px] p-2 " onChange={handleUsernameChange}/>
                        <input type="email" placeholder="email" className="border-b border-b-black outline-none m-2 w-[200px] transition duration-300 focus:shadow-[0_3px_3px_black] h-[35px] p-2" onChange={handleEmailChange}/>
                        <input type="password" placeholder="password" className="border-b border-b-black outline-none m-2 w-[200px] transition duration-300 focus:shadow-[0_3px_3px_black] h-[35px] p-2" onChange={handlePasswordChange}/>
                        <button type="submit" className="border border-black p-2 rounded-full transition duration-150 hover:shadow-[0_3px_3px_black] m-2" onClick={onSignup}>Sign Up</button>
                    </form>
                    <p className="h-[50px] flex items-center justify-center">Already have an account? Log in (make this a link)</p>
                </div>
                
            </div>
            
        </div>
    )
}