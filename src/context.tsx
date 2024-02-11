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

export const PrevRoutesListContext = createContext<
  [Route[], Dispatch<SetStateAction<Route[]>>] | undefined
>(undefined);

export const RouteContextProvider = ({ children }: { children: ReactNode }) => {
  const routeState = useState<Route>([
    {
      id: 0,
      name: "Tokyo",
      address: "Tokyo",
      location: { lat: 35.7080452, lng: 139.5394365 },
    },
  ]);
  const settingsState = useState<Settings>({
    origin: {
      id: 1,
      name: "Tokyo",
      address: "Tokyo",
      location: { lat: 35.6812362, lng: 139.7645445 },
    },
    destination: {
      id: 2,
      name: "Shibuya",
      address: "Shibuya",
      location: { lat: 35.6591083, lng: 139.7036861 },
    },
  });
  const addressListState = useState<Position[]>([
    {
      id: 0,
      name: "Tokyo",
      address: "Tokyo",
      location: { lat: 35.7080452, lng: 139.5394365 },
    },
    {
      id: 1,
      name: "Tokyo",
      address: "Tokyo",
      location: { lat: 35.6812362, lng: 139.7645445 },
    },
    {
      id: 2,
      name: "Shibuya",
      address: "Shibuya",
      location: { lat: 35.6591083, lng: 139.7036861 },
    },
  ]);
  const prevRoutesListState = useState<Route[]>([]);
  return (
    <SettingsContext.Provider value={settingsState}>
      <RouteContext.Provider value={routeState}>
        <AddressListContext.Provider value={addressListState}>
          <PrevRoutesListContext.Provider value={prevRoutesListState}>
            {children}
          </PrevRoutesListContext.Provider>
        </AddressListContext.Provider>
      </RouteContext.Provider>
    </SettingsContext.Provider>
  );
};
