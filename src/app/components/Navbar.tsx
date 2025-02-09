"use client"
// navbar component
import react from "react";
import { useRouter } from 'next/navigation';
import styles from "./Navbar.module.css";

export default function Navbar() {
    const router = useRouter();
    let token;
    token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }
    return(
        <div className={styles.headerDiv}>
            <div className={styles.corner}>
                <button onClick={() => router.push('/.')}>Musiimaker</button>
            </div>
            {token && (
            <div className={styles.button}>
                <button onClick={() => router.push('/dashboard')}> Dashboard </button>
                <button onClick={() => handleLogout()}> Log Out </button>
            </div>
            )}
            {!token && (
            <div className={styles.button}>
                <button onClick={() => router.push('/login')}> Log-In </button>
                <button onClick={() => router.push('/signup')}> Sign Up</button>
            </div>
            )}
            
        </div>
    )
}