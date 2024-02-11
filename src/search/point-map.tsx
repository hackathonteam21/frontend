import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";

import { AddressListContext, RouteContext } from "@/context.tsx";
import styles from "@/search/point-map.module.scss";

const _center = {
  lat: 35.6812362,
  lng: 139.7645445,
};

const PointMap = ({
  center = _center,
}: {
  center?: { lat: number; lng: number };
}) => {
  const routeContext = useContext(RouteContext);
  const addressListContext = useContext(AddressListContext);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    language: "ja",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });
  const [init, setInit] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInit(true);
    }, 100);
  }, []);
  if (!isLoaded || !routeContext || !addressListContext)
    return <div>loading...</div>;
  const [route] = routeContext;
  const [_addressList] = addressListContext;

  const addressList = _addressList.map((address) => ({
    ...address,
    isSelected: route.some((pos) => pos.id === address.id),
  }));
  return (
    <GoogleMap mapContainerClassName={styles.map} center={center} zoom={10}>
      {init &&
        addressList.map((address) => (
          //markerは遅延させないと表示されない
          <Marker
            key={address.id}
            position={address.location}
            title={address.name}
            label={address.name}
          />
        ))}
    </GoogleMap>
  );
};

export { PointMap };
