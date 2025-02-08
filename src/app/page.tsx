import Navbar from "./components/Navbar";
import Feed from "./components/Feed"
import styles from "./page.module.css"
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className={styles.mainDiv}>
        <div></div>
        <Feed />
        <div></div>
      </div>
    </div>
  );
}
