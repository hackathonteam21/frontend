import { useEffect, useState } from "react";
import styles from "./App.module.css";

type Position = {
  id: number;
  name: string;
  address: string;
  location: { lat: number; lng: number };
};

type AddressListDisplayProps = {
  onSelect: (selectedAddresses: Position[]) => void;
};

export function AddressListDisplay({ onSelect }: AddressListDisplayProps) {
  const [addressData, setAddressData] = useState<Position[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds((prevIds) => [...prevIds, id]);
    } else {
      setSelectedIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
    }
  };

  const handleConfirmClick = () => {
    const selectedAddresses = addressData.filter(
      (item) => selectedIds.includes(item.id) // 仮定: Position型には一意のidプロパティが存在する
    );
    onSelect(selectedAddresses);
    setSelectedIds([]);
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
                onChange={(e) =>
                  handleCheckboxChange(item.id, e.target.checked)
                }
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
