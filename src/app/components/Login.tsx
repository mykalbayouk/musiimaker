"use client"

import Link from "next/link"
import Navbar from "./Navbar"
import { useState } from 'react'
import { useRouter } from "next/navigation"

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }
    const handleLogin = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:2000/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password}),
            });
            const data = await response.json();
            // store token in local storage
            if (response.ok) {
                localStorage.setItem('token', data.token);
                router.push('./');
            } else {
                window.alert(data.message)
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
                        <h1 className="text-2xl w-1/4 text-center h-[50px] flex items-center">Log in</h1>
                        <form onSubmit={handleLogin} className="h-[300px] flex flex-col w-[390px] items-center justify-center">
                            <input onChange={handleEmailChange} type="email" placeholder="email" className="border-b border-b-black outline-none m-2 w-[200px] transition duration-300 focus:shadow-[0_3px_3px_black] h-[35px] p-2" />
                            <input onChange={handlePasswordChange} type="password" placeholder="password" className="border-b border-b-black outline-none m-2 w-[200px] transition duration-300 focus:shadow-[0_3px_3px_black] h-[35px] p-2" />
                            <button type="submit" className="border border-black p-2 rounded-full transition duration-150 hover:shadow-[0_3px_3px_black] m-2" >Log in</button>
                        </form>
                        <div className="w-[250px] flex justify-evenly">
                            <p className="h-[50px] flex items-center justify-center">Don't have an account? </p> 
                            <div className="flex items-center">
                                <Link className="border-b border-b-black transition duration-200 hover:shadow-[0_3px_3px_black]" href="/signup">Sign up</Link>
                            </div>
                            
                            
                        </div>
                    </div>
                    
                </div>
        </div>
    )
    
}