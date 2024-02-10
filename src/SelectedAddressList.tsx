import { Position } from "./types";
import styles from "./App.module.css";

type SelectedAddressListProps = {
  selectedAddresses: Position[];
  onRemove: (index: number) => void;
};

export function SelectedAddressList({
  selectedAddresses,
  onRemove,
}: SelectedAddressListProps) {
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
              onClick={() => onRemove(index)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
