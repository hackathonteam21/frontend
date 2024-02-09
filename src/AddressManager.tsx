import { useState } from "react";
import { AddressInputForm } from "./AddressInputForm";
import { AddressListDisplay } from "./AddressListDisplay";
import { SelectedAddressList } from "./SelectedAddressList";
import { PersonData } from "./types";

const addressData = [
  { fullName: "田中 太郎", address: "東京都新宿区..." },
  { fullName: "山田 花子", address: "大阪府大阪市..." },
  { fullName: "佐藤 次郎", address: "北海道札幌市..." },
];

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
