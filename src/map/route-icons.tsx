import ForkLeftIcon from "@mui/icons-material/ForkLeft";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import MergeIcon from "@mui/icons-material/Merge";
import RampLeftIcon from "@mui/icons-material/RampLeft";
import RampRightIcon from "@mui/icons-material/RampRight";
import RoundaboutLeftIcon from "@mui/icons-material/RoundaboutLeft";
import RoundaboutRightIcon from "@mui/icons-material/RoundaboutRight";
import StraightIcon from "@mui/icons-material/Straight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import TurnSlightRightIcon from "@mui/icons-material/TurnSlightRight";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import UTurnRightIcon from "@mui/icons-material/UTurnRight";
import { JSX } from "react";

const RouteIcons: { [key: string]: JSX.Element } = {
  "turn-left": <TurnLeftIcon />,
  "turn-right": <TurnRightIcon />,
  straight: <StraightIcon />,
  "ramp-left": <RampLeftIcon />,
  "ramp-right": <RampRightIcon />,
  merge: <MergeIcon />,
  "turn-slight-left": <TurnSlightLeftIcon />,
  "turn-slight-right": <TurnSlightRightIcon />,
  "uturn-left": <UTurnLeftIcon />,
  "uturn-right": <UTurnRightIcon />,
  "fork-left": <ForkLeftIcon />,
  "fork-right": <ForkRightIcon />,
  "roundabout-left": <RoundaboutLeftIcon />,
  "roundabout-right": <RoundaboutRightIcon />,
};

export { RouteIcons };
