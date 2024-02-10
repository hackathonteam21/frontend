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
  // ここにDirectionsServiceへのAPIコールで得られたルート情報を保存する

  const directionsCallback = useCallback<
    (result: google.maps.DirectionsResult | null) => void
  >(
    (googleResponse) => {
      if (!googleResponse) return;
      if (isApiResponseOk(googleResponse)) {
        if (
          currentDirection &&
          currentDirection.geocoded_waypoints?.length ===
            googleResponse.geocoded_waypoints?.length
        ) {
          console.log("前回と同じルートのためstateを更新しない");
          return;
        }
        console.log("初めてルートが設定されたため、stateを更新する");
        setCurrentDirection(googleResponse);
      }
    },
    [currentDirection],
  );
  // (1) DirectionsServiceコンポーネントはレンダーされるとルート検索し、結果をcallbackとして返す。
  // (2) このAPIレスポンスを今回のようにstateに保存すると、stateが変わったことにより、DirecitonsServiceコンポーネントが再度レンダーされる。
  // (3) DirectionsServiceコンポーネントがレンダーされると再度APIコールを行う。
  // 上記(1)~(3)の無限ループを防ぐため、(3)の結果がstateと変わらなければstateを更新しない、という処理を上記に実装した

  return (
    <>
      <DirectionsService
        options={{
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          // 走行モードを指定する。今回は自動車に設定
          optimizeWaypoints: true,
          // 経由地の順序を最適化する場合はtrueに設定する
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
        // DirectionsServiceのAPI検索の結果としてcurrenctDirectionがあれば、その結果をDirectionsRendererで表示する。
        // 予めルート情報を持っていれば、DirecitonsServiceでAPIコールする必要はない。
      )}
    </>
  );
};

export { Direction };
