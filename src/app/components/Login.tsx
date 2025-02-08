"use client"

import Link from "next/link"
import Navbar from "./Navbar"
import { useRouter } from "next/navigation"

export default function Login() {
    const router = useRouter();
    return (
        <div>
            <Navbar />            
                <div className="flex justify-center items-center h-[780px] w-full"> 
                    <div className="h-[400px] w-[400px] flex flex-col justify-center items-center border border-black rounded-[20px]">
                        <h1 className="text-2xl w-1/4 text-center h-[50px] flex items-center">Log in</h1>
                        <form className="h-[300px] flex flex-col w-[390px] items-center justify-center">
                            <input type="email" placeholder="email" className="border-b border-b-black outline-none m-2 w-[200px] transition duration-300 focus:shadow-[0_3px_3px_black] h-[35px] p-2" />
                            <input type="password" placeholder="password" className="border-b border-b-black outline-none m-2 w-[200px] transition duration-300 focus:shadow-[0_3px_3px_black] h-[35px] p-2" />
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