import { useState } from "react";

// 静的な名前と住所のデータ
const addressData = [
  { fullName: "田中 太郎", address: "東京都新宿区..." },
  { fullName: "山田 花子", address: "大阪府大阪市..." },
  { fullName: "佐藤 次郎", address: "北海道札幌市..." },
];

//CSSは後で分離
const commonStyles = {
  input: {
    padding: "8px",
    margin: "5px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  container: {
    marginBottom: "20px",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};

function AddressInputForm() {
  return (
    <div style={commonStyles.container}>
      <h2>名前/住所を登録</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input type="text" style={commonStyles.input} placeholder="名前" />
        <input type="text" style={commonStyles.input} placeholder="住所" />
      </div>
      <button style={commonStyles.button}>追加</button>
    </div>
  );
}

type PersonData = {
  fullName: string;
  address: string;
};

type AddressListDisplayProps = {
  addressData: PersonData[];
  onSelect: (address: PersonData) => void;
};

function AddressListDisplay({
  addressData,
  onSelect,
}: AddressListDisplayProps) {
  return (
    <div style={commonStyles.container}>
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
            <button style={commonStyles.button} onClick={() => onSelect(item)}>
              コースに追加
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SelectedAddressList({
  selectedAddresses,
  onRemove,
}: {
  selectedAddresses: PersonData[];
  onRemove: (index: number) => void;
}) {
  return (
    <div style={commonStyles.container}>
      <h2>コース</h2>
      <ul>
        {selectedAddresses.map((address, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {address.fullName} - {address.address}
            </span>
            <button
              style={{ ...commonStyles.button, backgroundColor: "#dc3545" }}
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

export default function AddressManager() {
  const [selectedAddresses, setSelectedAddresses] = useState<PersonData[]>([]);

  const handleSelectAddress = (address: PersonData) => {
    const isAlreadyAdded = selectedAddresses.some(
      (selectedAddress) =>
        selectedAddress.fullName === address.fullName &&
        selectedAddress.address === address.address,
    );

    if (isAlreadyAdded) {
      console.log("このアドレスは既に追加されています。");
      return;
    }

    setSelectedAddresses((prev) => [...prev, address]);
  };

  const handleRemoveAddress = (index: number) => {
    setSelectedAddresses((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <SelectedAddressList
        selectedAddresses={selectedAddresses}
        onRemove={handleRemoveAddress}
      />
      <AddressInputForm />
      <AddressListDisplay
        addressData={addressData}
        onSelect={handleSelectAddress}
      />
    </>
  );
}
