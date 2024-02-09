import styles from "./App.module.css";

export function AddressInputForm() {
  return (
    <div className={styles.container}>
      <h2>名前/住所を登録</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input className={styles.input} type="text" placeholder="名前" />
        <input className={styles.input} type="text" placeholder="住所" />
      </div>
      <button className={styles.button}>追加</button>
    </div>
  );
}
