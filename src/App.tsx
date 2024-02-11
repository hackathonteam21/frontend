import { useContext } from "react";

import { SearchPage } from "@/search";

import { RouteContext } from "./context";
import { SearchResultPage } from "./search-result";

function App() {
  const routeContext = useContext(RouteContext);
  if (!routeContext) return;
  const [route] = routeContext;
  if (route.length === 0) return <SearchPage />;
  return <SearchResultPage />;
}

export default App;
