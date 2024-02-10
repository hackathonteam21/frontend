import styles from "./App.module.css";
import { useContext } from "react";
import { RouteContext } from "./context";

export function SelectedAddressList() {
  const context = useContext(RouteContext);
  if (!context) return;
  const [selectedAddresses, setSelectedAddresses] = context;

  return (
    <div className={styles.container}>
      <h2>コース</h2>
      <ul>
        {selectedAddresses.map((address, index) => (
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
