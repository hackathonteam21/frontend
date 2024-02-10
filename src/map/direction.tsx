import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { FC, useCallback, useState } from "react";

import { TLocation } from "../@types/location";

const isApiResponseOk = (i: unknown) => {
  return (i as { status: string })?.status === "OK";
};

type TProps = {
  origin: TLocation;
  destination: TLocation;
  transitPoints: TLocation[];
};

const Direction: FC<TProps> = ({
  origin,
  destination,
  transitPoints: _transitPoints,
}) => {
  const transitPoints: google.maps.DirectionsWaypoint[] = _transitPoints.map(
    (point) => ({ location: point }),
  );

  const [currentDirection, setCurrentDirection] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const directionsCallback = useCallback<
    (result: google.maps.DirectionsResult | null) => void
  >(
    (googleResponse) => {
      if (!googleResponse) return;
      if (!isApiResponseOk(googleResponse)) {
        return;
      }
      if (
        currentDirection?.geocoded_waypoints?.length ===
        googleResponse.geocoded_waypoints?.length
      ) {
        return;
      }
      setCurrentDirection(googleResponse);
    },
    [currentDirection],
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
      {currentDirection && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
          }}
        />
      )}
    </>
  );
};

export { Direction };
