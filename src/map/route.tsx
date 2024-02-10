import { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import styles from "./route.module.scss";
import { RouteIcons } from "./route-icons";

type TProps = {
  route: google.maps.DirectionsRoute;
};

const RouteRenderer: FC<TProps> = ({ route }) => {
  return (
    <div>
      {route.legs.map((leg, i) => {
        return <RouteLegRenderer leg={leg} key={i} />;
      })}
    </div>
  );
};

const RouteLegRenderer: FC<{ leg: google.maps.DirectionsLeg }> = ({ leg }) => {
  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>{leg.end_address}</AccordionTrigger>
        <AccordionContent className={styles.routeLeg}>
          {leg.steps.map((step, j) => (
            <div className={styles.routeStep} key={j}>
              <div className={styles.icon}>
                {RouteIcons[step.maneuver] ?? <></>}
              </div>
              {step.instructions.replace(/<.*?>/g, "")}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { RouteRenderer };
