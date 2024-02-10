import { AddressInputForm } from "./AddressInputForm";
import { AddressListDisplay } from "./AddressListDisplay";
import { SelectedAddressList } from "./SelectedAddressList";
import { useContext } from "react";
import { RouteContext } from "./context";
import { Position } from "./types";

export default function AddressManager() {
  //const [selectedAddresses, setSelectedAddresses] = useState<PersonData[]>([]);
  const context = useContext(RouteContext);
  if (!context) return;
  const [selectedAddresses, setSelectedAddresses] = context;

  const handleSelectAddress = (address: Position) => {
    const isAlreadyAdded = selectedAddresses.some(
      (selectedAddress) =>
        selectedAddress.name === address.name &&
        selectedAddress.address === address.address
    );

    if (isAlreadyAdded) {
      console.log("このアドレスは既に追加されています。");
      return;
    }

    setSelectedAddresses((prev: Position[]) => [...prev, address]);
    //setSelectedAddresses([...selectedAddresses, address]);
  };

  const handleRemoveAddress = (index: number) => {
    //setSelectedAddresses((prev) => prev.filter((_, i) => i !== index));
    setSelectedAddresses((prev: Position[]) =>
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
      <AddressListDisplay onSelect={handleSelectAddress} />
    </>
  );
}
