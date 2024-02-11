import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useContext, useRef, useState } from "react";

import { RouteContext, SettingsContext } from "../context.tsx";
import { Direction } from "./direction";
import styles from "./map.module.scss";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const center = {
  lat: 35.6812362,
  lng: 139.7645445,
};

const MainMap = () => {
  const routeContext = useContext(RouteContext);
  const settingContext = useContext(SettingsContext);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    language: "ja",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });
  const [direction, setDirection] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const routeRenderRef = useRef<HTMLDivElement>(null);
  if (!isLoaded || !routeContext || !settingContext)
    return <div>loading...</div>;
  const [route] = routeContext;
  const [settings] = settingContext;

  return (
    <div className={styles.wrapper}>
      <div className={styles.map}>
        <GoogleMap mapContainerClassName={styles.map} center={center} zoom={10}>
          {settings.origin && settings.destination && (
            <Direction
              origin={settings.origin.location}
              transitPoints={route.map((pos) => pos.location)}
              destination={settings.destination.location}
              directions={direction}
              setDirections={setDirection}
              routeRender={routeRenderRef.current}
            />
          )}
        </GoogleMap>
        <button
          className={styles.toggle}
          onClick={() => setIsSidebarOpen((pv) => !pv)}
        >
          {isSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </div>
      <aside className={`${styles.side} ${isSidebarOpen && styles.open}`}>
        <div ref={routeRenderRef}></div>
      </aside>
    </div>
  );
};

export { MainMap };
