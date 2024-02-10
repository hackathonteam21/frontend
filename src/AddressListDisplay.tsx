import { useEffect, useState } from "react";
import { Position } from "./types";
import styles from "./App.module.css";

type AddressListDisplayProps = {
  onSelect: (address: Position) => void;
};

export function AddressListDisplay({ onSelect }: AddressListDisplayProps) {
  const [addressData, setAddressData] = useState<Position[]>([]);

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

  return (
    <div className={styles.container}>
      <h2>名前/住所</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {addressData.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <div>
              <span>{item.name}</span>
              <span style={{ marginLeft: "30px" }}>{item.address}</span>
            </div>
            <button className={styles.button} onClick={() => onSelect(item)}>
              コースに追加
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
