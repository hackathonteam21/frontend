import { AddressInputForm } from "./AddressInputForm";
import { AddressListDisplay } from "./AddressListDisplay";
import { PrevRoutesList } from "./PrevRoutesList";

export default function AddressManager() {
  return (
    <>
      <AddressInputForm />
      <AddressListDisplay />
      <PrevRoutesList />
    </>
  );
}
