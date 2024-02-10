import { createContext, ReactNode, useState } from "react";

type Position = {
  name: string;
  address: string;
  location: { lat: number; lng: number };
};

type Route = Position[];

export const RouteContext = createContext<
  [Route, (route: Route) => void] | undefined
>(undefined);

type Settings = {
  origin?: Position;
  destination?: Position;
};

export const SettingsContext = createContext<
  [Settings, (settings: Settings) => void] | undefined
>(undefined);

export const RouteContextProvider = ({ children }: { children: ReactNode }) => {
  const routeState = useState<Route>([]);
  const settingsState = useState<Settings>({
    origin: undefined,
    destination: undefined,
  });
  return (
    <SettingsContext.Provider value={settingsState}>
      <RouteContext.Provider value={routeState}>
        {children}
      </RouteContext.Provider>
    </SettingsContext.Provider>
  );
};
