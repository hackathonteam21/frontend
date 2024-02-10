import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useContext, useState } from "react";

import { RouteContext, SettingsContext } from "../context.tsx";
import { Direction } from "./direction";
import styles from "./map.module.scss";
import { RouteRenderer } from "./route.tsx";

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
  if (!isLoaded || !routeContext || !settingContext)
    return <div>loading...</div>;
  const [route] = routeContext;
  const [settings] = settingContext;

  console.log(direction?.routes[0]);

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
            />
          )}
        </GoogleMap>
      </div>
      <aside className={styles.side}>
        {direction && <RouteRenderer route={direction.routes[0]} />}
      </aside>
    </div>
  );
};

export { MainMap };
