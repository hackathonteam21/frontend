import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Position = {
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

export const RouteContextProvider = ({ children }: { children: ReactNode }) => {
  const routeState = useState<Route>([
    {
      name: "Tokyo",
      address: "Tokyo",
      location: { lat: 35.7080452, lng: 139.5394365 },
    },
  ]);
  const settingsState = useState<Settings>({
    origin: {
      name: "Tokyo",
      address: "Tokyo",
      location: { lat: 35.6812362, lng: 139.7645445 },
    },
    destination: {
      name: "Shibuya",
      address: "Shibuya",
      location: { lat: 35.6591083, lng: 139.7036861 },
    },
  });
  return (
    <SettingsContext.Provider value={settingsState}>
      <RouteContext.Provider value={routeState}>
        {children}
      </RouteContext.Provider>
    </SettingsContext.Provider>
  );
};
