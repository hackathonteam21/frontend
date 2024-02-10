import { AddressInputForm } from "./AddressInputForm";
import { AddressListDisplay } from "./AddressListDisplay";
import { SelectedAddressList } from "./SelectedAddressList";
import { useContext } from "react";
import { RouteContext } from "./context";
import { PersonData } from "./types";

const addressData = [
  { fullName: "田中 太郎", address: "東京都新宿区..." },
  { fullName: "山田 花子", address: "大阪府大阪市..." },
  { fullName: "佐藤 次郎", address: "北海道札幌市..." },
];

export default function AddressManager() {
  //const [selectedAddresses, setSelectedAddresses] = useState<PersonData[]>([]);
  const context = useContext(RouteContext);
  if (!context) return;
  const [selectedAddresses, setSelectedAddresses] = context;

  const handleSelectAddress = (address: PersonData) => {
    const isAlreadyAdded = selectedAddresses.some(
      (selectedAddress) =>
        selectedAddress.fullName === address.fullName &&
        selectedAddress.address === address.address
    );

    if (isAlreadyAdded) {
      console.log("このアドレスは既に追加されています。");
      return;
    }

    setSelectedAddresses((prev: PersonData[]) => [...prev, address]);
    //setSelectedAddresses([...selectedAddresses, address]);
  };

  const handleRemoveAddress = (index: number) => {
    //setSelectedAddresses((prev) => prev.filter((_, i) => i !== index));
    setSelectedAddresses((prev: PersonData[]) =>
      prev.filter((_, i: number) => i !== index)
    );
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
