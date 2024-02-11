import { AddressInputForm } from "./AddressInputForm";
import { AddressListDisplay } from "./AddressListDisplay";
import { CurrentRoute } from "./CurrentRoute";

export default function AddressManager() {
  return (
    <>
      <CurrentRoute />
      <AddressInputForm />
      <AddressListDisplay />
    </>
  );
}
