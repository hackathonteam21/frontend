import { useContext } from "react";

import styles from "./App.module.css";
import { RouteContext } from "./context.tsx";
import { MainMap } from "./map/map.tsx";

function App() {
  const context = useContext(RouteContext);
  if (!context) return;
  const [route, setRoute] = context;

  return (
    <div
      className={styles.wrapper}
      onClick={() => setRoute([{ text: "Home" }])}
    >
      <MainMap />
      {JSON.stringify(route)}
    </div>
  );
}

export default App;
