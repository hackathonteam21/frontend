import React, { useState } from "react";
import styles from "./App.module.css";
import { Position } from "./types";

export function AddressInputForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async () => {
    const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${VITE_GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;

        const postUrl = "ここにURLを挿入"; // データベースのエンドポイントURL(？)
        const positionData: Position = {
          name,
          address,
          location: { lat, lng },
        };
        const dbResponse = await fetch(postUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(positionData),
        });
        if (!dbResponse.ok) {
          throw new Error("データの送信に失敗しました。");
        }
        alert("データを登録しました。");
        setName("");
        setAddress("");
      } else {
        throw new Error("住所の変換に失敗しました。");
      }
    } catch (error) {
      console.error("データ取得中にエラーが発生しました:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>名前/住所を登録</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          className={styles.input}
          type="text"
          placeholder="名前"
          value={name}
          onChange={handleNameChange}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="住所"
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <button className={styles.button} onClick={handleSubmit}>
        追加
      </button>
    </div>
  );
}
