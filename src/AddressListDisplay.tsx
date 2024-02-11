import { useContext, useEffect, useState } from "react";

import styles from "./App.module.css";
import { AddressListContext, RouteContext } from "./context";
import { Position } from "./types";

export function AddressListDisplay() {
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]); //チェックボックス
  const addressListContext = useContext(AddressListContext);
  const routeContext = useContext(RouteContext);
  useEffect(() => {
    const fetchAddressData = async () => {
      const apiUrl = "APIのURLを挿入";
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("データの取得に失敗しました。");
        }
        const data: Position[] = await response.json();
        addressListContext?.[1](data);
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };

    fetchAddressData();
  }, []);
  if (!routeContext) return;
  if (!addressListContext) return;
  const [addressList, setAddressList] = addressListContext;
  const [, setCurrentRoute] = routeContext;

  const handleCheckboxChange = (position: Position, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPositions((prevPositions) => [...prevPositions, position]);
    } else {
      setSelectedPositions((prevPositions) =>
        prevPositions.filter((prevPosition) => prevPosition !== position),
      );
    }
  };

  const handleRemovePosition = async (id: number) => {
    const deleteApiUrl = `ここにAPIのURLを挿入/${id}`;
    try {
      const response = await fetch(deleteApiUrl, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("データの削除に失敗しました。");
      }
      setAddressList((prevData) => prevData.filter((item) => item.id !== id));
      setSelectedPositions((prevPositions) =>
        prevPositions.filter((item) => item.id !== id),
      );
    } catch (error) {
      console.error("データ削除中にエラーが発生しました:", error);
    }
  };

  const handleConfirmClick = () => {
    setCurrentRoute(selectedPositions);
    setSelectedPositions([]);
  };

  return (
    <div className={styles.container}>
      <h2>名前/住所</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {addressList.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <div>
              <span>{item.name}</span>
              <span style={{ marginLeft: "30px" }}>{item.address}</span>
            </div>
            <input
              type="checkbox"
              onChange={(e) => handleCheckboxChange(item, e.target.checked)}
            />
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => handleRemovePosition(item.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={handleConfirmClick}>
        コースを検索
      </button>
    </div>
  );
}
