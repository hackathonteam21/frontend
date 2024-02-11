import { useContext, useEffect } from "react";

import styles from "./App.module.css";
import { PrevRoutesListContext, RouteContext } from "./context";
import { Position, Route } from "./types";

export function PrevRoutesList() {
  const context = useContext(RouteContext);
  const prevRoutesListContext = useContext(PrevRoutesListContext);
  useEffect(() => {
    const fetchPrevRoutes = async () => {
      const apiUrl = "APIのURLを挿入";
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("データの取得に失敗しました。");
        }
        const data: Route[] = await response.json();
        prevRoutesListContext?.[1](data);
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };

    fetchPrevRoutes();
  }, []);
  if (!prevRoutesListContext) return;
  if (!context) return null;
  const [prevRoutesList] = prevRoutesListContext;
  const [, setCurrentRoute] = context;

  return (
    <div className={styles.container}>
      <h2>過去に検索したコース</h2>
      {prevRoutesList.map((route, routeIndex) => (
        <div key={routeIndex}>
          <h3>コース {routeIndex + 1}</h3>
          <ul>
            {route.map((position: Position, index) => (
              <li key={index} className={styles.listItem}>
                <span>
                  {position.name} - {position.address}
                </span>
              </li>
            ))}
          </ul>
          <button
            className={styles.button}
            onClick={() => setCurrentRoute(route)}
          >
            コースを表示
          </button>
        </div>
      ))}
    </div>
  );
}
