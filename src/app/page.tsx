'use client';
import Navbar from "./components/Navbar";
import getTheMidi from "../basicpitch/basicpitch"

export default function Home() {

  console.log(getTheMidi());

  return (
    <div>
      <Navbar />
      
    </div>
  );
}
