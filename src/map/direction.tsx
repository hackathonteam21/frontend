import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { FC, useCallback } from "react";

import { TLocation } from "../@types/location";

const isApiResponseOk = (i: unknown) => {
  return (i as { status: string })?.status === "OK";
};

type TProps = {
  origin: TLocation;
  destination: TLocation;
  transitPoints: TLocation[];
  directions?: google.maps.DirectionsResult;
  setDirections: (direction: google.maps.DirectionsResult) => void;
};

const Direction: FC<TProps> = ({
  origin,
  destination,
  transitPoints: _transitPoints,
  directions,
  setDirections,
}) => {
  const transitPoints: google.maps.DirectionsWaypoint[] = _transitPoints.map(
    (point) => ({ location: point }),
  );

  const directionsCallback = useCallback<
    (result: google.maps.DirectionsResult | null) => void
  >(
    (googleResponse) => {
      if (!googleResponse) return;
      if (!isApiResponseOk(googleResponse)) {
        return;
      }
      if (
        directions?.geocoded_waypoints?.length ===
        googleResponse.geocoded_waypoints?.length
      ) {
        return;
      }
      setDirections(googleResponse);
    },
    [directions],
  );

  return (
    <>
      <DirectionsService
        options={{
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,
          waypoints: transitPoints,
        }}
        callback={directionsCallback}
      />
      {directions && (
        <DirectionsRenderer
          options={{
            directions: directions,
          }}
        />
      )}
    </>
  );
};

export { Direction };
