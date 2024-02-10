import { AddressInputForm } from "./AddressInputForm";
import { AddressListDisplay } from "./AddressListDisplay";
import { SelectedAddressList } from "./SelectedAddressList";

export default function AddressManager() {
  return (
    <>
      <SelectedAddressList />
      <AddressInputForm />
      <AddressListDisplay />
    </>
  );
}
