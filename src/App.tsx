import styles from "./App.module.css";

import { useContext } from "react";
import { RouteContext } from "./context.tsx";

function App() {
  const context = useContext(RouteContext);
  if (!context) return;
  const [route, setRoute] = context;

  return (
    <div
      className={styles.wrapper}
      onClick={() => setRoute([{ text: "Home" }])}
    >
      {JSON.stringify(route)}
    </div>
  );
}

export default App;
