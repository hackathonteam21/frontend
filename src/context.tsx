import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Position = {
  id: number;
  name: string;
  address: string;
  location: { lat: number; lng: number };
};

type Route = Position[];

export const RouteContext = createContext<
  [Route, Dispatch<SetStateAction<Route>>] | undefined
>(undefined);

type Settings = {
  origin?: Position;
  destination?: Position;
};

export const SettingsContext = createContext<
  [Settings, Dispatch<SetStateAction<Settings>>] | undefined
>(undefined);

export const AddressListContext = createContext<
  [Position[], Dispatch<SetStateAction<Position[]>>] | undefined
>(undefined);

export const RouteContextProvider = ({ children }: { children: ReactNode }) => {
  const routeState = useState<Route>([]);
  const settingsState = useState<Settings>({
    origin: undefined,
    destination: undefined,
  });
  const addressListState = useState<Position[]>([]);
  return (
    <SettingsContext.Provider value={settingsState}>
      <RouteContext.Provider value={routeState}>
        <AddressListContext.Provider value={addressListState}>
          {children}
        </AddressListContext.Provider>
      </RouteContext.Provider>
    </SettingsContext.Provider>
  );
};
