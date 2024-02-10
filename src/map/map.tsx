import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { Direction } from "./direction";
import styles from "./map.module.scss";
import { useContext } from "react";
import { RouteContext } from "../context.tsx";

const center = {
  lat: -3.745,
  lng: -38.523,
};

const destination = {
  lat: 35.5020314,
  lng: 138.448022,
};

const MainMap = () => {
  const context = useContext(RouteContext);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });
  if (!isLoaded || !context) return <div>loading...</div>;
  const [route] = context;
  return (
    <div className={styles.wrapper}>
      <GoogleMap mapContainerClassName={styles.map} center={center} zoom={10}>
        <Direction
          origin={destination}
          transitPoints={route.map((pos) => pos.location)}
          destination={destination}
        />
      </GoogleMap>
    </div>
  );
};

export { MainMap };
