import { createContext, ReactNode, useState } from "react";

type Route = {
  text: string;
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
