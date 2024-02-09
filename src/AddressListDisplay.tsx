import { PersonData } from "./types";
import styles from "./App.module.css";

type AddressListDisplayProps = {
  addressData: PersonData[];
  onSelect: (address: PersonData) => void;
};

export function AddressListDisplay({
  addressData,
  onSelect,
}: AddressListDisplayProps) {
  return (
    <div className={styles.container}>
      <h2>名前/住所</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {addressData.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span>{item.fullName}</span>{" "}
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
