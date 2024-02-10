import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { useContext } from "react";
import { RouteContext } from "./context";
import { Position } from "./types";

export function AddressListDisplay() {
  const [addressData, setAddressData] = useState<Position[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const context = useContext(RouteContext);
  if (!context) return;
  const [selectedAddresses, setSelectedAddresses] = context;

  useEffect(() => {
    const fetchAddressData = async () => {
      const apiUrl = "APIのURLを挿入";
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("データの取得に失敗しました。");
        }
        const data: Position[] = await response.json();
        setAddressData(data);
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };

    fetchAddressData();
  }, []);

  const handleCheckboxChange = (position: Position, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPositions((prevPositions) => [...prevPositions, position]);
    } else {
      setSelectedPositions((prevPositions) =>
        prevPositions.filter((prevPosition) => prevPosition !== position)
      );
    }
  };

  const handleConfirmClick = () => {
    setSelectedAddresses(selectedPositions);
    setSelectedPositions([]);
  };

  return (
    <div className={styles.container}>
      <h2>名前/住所</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {addressData.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <div>
              <span>{item.name}</span>
              <span style={{ marginLeft: "30px" }}>{item.address}</span>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(item, e.target.checked)}
              />
            </div>
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={handleConfirmClick}>
        確定
      </button>
    </div>
  );
}
