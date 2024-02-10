import { createContext, ReactNode, useState } from "react";
import { PersonData } from "./types";

export const RouteContext = createContext<
  [PersonData[], (addresses: PersonData[]) => void] | undefined
>(undefined);
export const RouteContextProvider = ({ children }: { children: ReactNode }) => {
  const routeState = useState<PersonData[]>([]);
  return (
    <RouteContext.Provider value={routeState}>{children}</RouteContext.Provider>
  );
};
