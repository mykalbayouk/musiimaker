import Navbar from "./components/Navbar";
import Feed from "./components/Feed"
import styles from "./page.module.css"
export default function Home() {
  return (
    <div>
      <Navbar />
<<<<<<< HEAD
      <div className={styles.mainDiv}>
        <div></div>
        <Feed />
        <div></div>
=======
      <div>
        feed goes here, unauthenticated users can only view posts
>>>>>>> login
      </div>
    </div>
  );
}
