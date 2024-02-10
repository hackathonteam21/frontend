import styles from "./App.module.css";
import { MainMap } from "./map/map.tsx";

function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.map}>
        <MainMap />
      </div>
      <div className={styles.side}>sidebar</div>
    </div>
  );
}

export default App;
