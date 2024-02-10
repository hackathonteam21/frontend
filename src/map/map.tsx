import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { Direction } from "./direction";
import styles from "./map.module.scss";
import { useContext } from "react";
import { RouteContext, SettingsContext } from "../context.tsx";

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MainMap = () => {
  const routeContext = useContext(RouteContext);
  const settingContext = useContext(SettingsContext);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });
  if (!isLoaded || !routeContext || !settingContext)
    return <div>loading...</div>;
  const [route] = routeContext;
  const [settings] = settingContext;

  return (
    <div className={styles.wrapper}>
      <GoogleMap mapContainerClassName={styles.map} center={center} zoom={10}>
        {settings.origin && settings.destination && (
          <Direction
            origin={settings.origin.location}
            transitPoints={route.map((pos) => pos.location)}
            destination={settings.destination.location}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export { MainMap };
