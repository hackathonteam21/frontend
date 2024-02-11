import styles from "./App.module.css";
import { useContext } from "react";
import { RouteContext } from "./context";
import { Position, Route } from "./types";

export function CurrentRoute() {
  const context = useContext(RouteContext);
  if (!context) return;
  const [currentRoute, setCurrentRoute] = context;

  return (
    <div className={styles.container}>
      <h2>現在マップに表示されているコース</h2>
      <ul>
        {currentRoute.map((address, index) => (
          <li key={index} className={styles.listItem}>
            <span>
              {address.name} - {address.address}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
