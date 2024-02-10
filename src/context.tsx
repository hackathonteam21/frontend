import { createContext, ReactNode, useState } from "react";

type Route = {
  name: string;
  address: string;
  location: { lat: number; lng: number };
}[];

export const RouteContext = createContext<
  [Route, (route: Route) => void] | undefined
>(undefined);

export const RouteContextProvider = ({ children }: { children: ReactNode }) => {
  const routeState = useState<Route>([]);
  return (
    <RouteContext.Provider value={routeState}>{children}</RouteContext.Provider>
  );
};
