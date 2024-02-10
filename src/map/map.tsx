import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import styles from "./map.module.scss";

import Direction from "./Direction";

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MainMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });
  if (!isLoaded) return <div>loading...</div>;
  return (
    <div className={styles.wrapper}>
      <GoogleMap mapContainerClassName={styles.map} center={center} zoom={10}>
        <Direction />
      </GoogleMap>
    </div>
  );
};

export { MainMap };
