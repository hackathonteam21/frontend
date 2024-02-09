import "@here/maps-api-for-javascript/bin/mapsjs-ui.css";

import H from "@here/maps-api-for-javascript";
import { useEffect, useRef } from "react";

import styles from "./map.module.scss";

const origin = { lat: 56.97, lng: 24.09 };
const destination = { lat: 54.7, lng: 25.24 };
const routingParameters = {
  routingMode: "fast",
  transportMode: "car",
  // The start point of the route:
  origin: `${origin.lat},${origin.lng}`,
  // The end point of the route:
  destination: `${destination.lat},${destination.lng}`,
  // Include the route shape in the response
  return: "polyline",
};

const MainMap = () => {
  const mapRef = useRef<H.Map>();
  const targetRef = useRef<HTMLDivElement>(null);
  const platform = useRef(
    new H.service.Platform({
      apikey: import.meta.env.VITE_HERE_API_KEY as string,
    }),
  );
  const router = useRef(platform.current.getRoutingService(undefined, 8));
  const onResult = function (result: {
    routes: { sections: { polyline: string }[] }[];
  }) {
    // Ensure that at least one route was found
    if (result.routes.length && mapRef.current) {
      const lineStrings: H.geo.LineString[] = [];
      result.routes[0].sections.forEach((section: { polyline: string }) => {
        // Create a linestring to use as a point source for the route line
        lineStrings.push(
          H.geo.LineString.fromFlexiblePolyline(section.polyline),
        );
      });

      // Create an instance of H.geo.MultiLineString
      const multiLineString = new H.geo.MultiLineString(lineStrings);

      // Create a polyline to display the route:
      const routeLine = new H.map.Polyline(multiLineString, {
        data: undefined,
        style: {
          strokeColor: "blue",
          lineWidth: 3,
        },
      });

      // Create a marker for the start point:
      const startMarker = new H.map.Marker(origin);

      // Create a marker for the end point:
      const endMarker = new H.map.Marker(destination);

      // Create a H.map.Group to hold all the map objects and enable us to obtain
      // the bounding box that contains all its objects within
      const group = new H.map.Group();
      group.addObjects([routeLine, startMarker, endMarker]);
      // Add the group to the map
      mapRef.current.addObject(group);

      // Set the map viewport to make the entire route visible:
      mapRef.current.getViewModel().setLookAtData({
        bounds: group.getBoundingBox(),
      });
    }
  };
  useEffect(() => {
    if (mapRef.current || !targetRef.current) {
      return;
    }
    const layers = platform.current.createDefaultLayers() as {
      vector: {
        normal: {
          map: H.map.layer.Layer;
        };
      };
    };
    const defaultLayers = platform.current.createDefaultLayers();
    mapRef.current = new H.Map(targetRef.current, layers.vector.normal.map, {
      zoom: 7,
      center: { lat: 56.97, lng: 24.09 },
      // Add space around the map edges to ensure markers are not cut off:
      padding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
    new H.mapevents.Behavior(new H.mapevents.MapEvents(mapRef.current));

    H.ui.UI.createDefault(mapRef.current, defaultLayers);
    router.current.calculateRoute(
      routingParameters,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onResult,
      function (error) {
        alert(error.message);
      },
    );
  }, []);
  useEffect(() => {
    if (!mapRef.current || !targetRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      mapRef.current?.getViewPort().resize();
    });
    resizeObserver.observe(targetRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.map} ref={targetRef}></div>
    </div>
  );
};

export { MainMap };
