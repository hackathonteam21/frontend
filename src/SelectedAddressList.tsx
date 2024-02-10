import { Position } from "./types";
import styles from "./App.module.css";
import { useContext } from "react";
import { RouteContext } from "./context";

export function SelectedAddressList() {
  const context = useContext(RouteContext);
  if (!context) return;
  const [selectedAddresses, setSelectedAddresses] = context;

  const handleRemoveAddress = (index: number) => {
    setSelectedAddresses((prev: Position[]) =>
      prev.filter((_, i: number) => i !== index)
    );
  };

  return (
    <div className={styles.container}>
      <h2>コース</h2>
      <ul>
        {selectedAddresses.map((address, index) => (
          <li key={index} className={styles.listItem}>
            <span>
              {address.name} - {address.address}
            </span>
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => handleRemoveAddress(index)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
