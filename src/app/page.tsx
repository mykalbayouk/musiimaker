import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div>
        feed goes here, unauthenticated users can only view posts
      </div>
    </div>
  );
}
