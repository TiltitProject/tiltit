import Matter from "matter-js";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import MakePlayer from "../components/Player";
import BlockMaker from "../components/Block";
import makeMap from "../utils/makeMap";
import {
  makeBlocks,
  makeMonsters,
  makeItems,
  makeFlags,
} from "../utils/makeEntities";
import entityInfo from "./entitiesInfo";
import stageSheet from "../../assets/stageSheet.json";
import { selectCurrentStage } from "../features/gameSlice";
import ItemMaker from "../components/Item";
import { apple } from "../../assets/static";
import FlagMaker from "../components/Flag";
import FloorMaker from "../components/Floor";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;

const mapInfo2 = makeMap(stageSheet[2], entityInfo[2]);

export default function Stage2() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  engine.gravity.y = 0;

  const blocks = makeBlocks(world, mapInfo2, entityInfo[2]);
  const monsters = makeMonsters(world, mapInfo2, entityInfo[2]);
  const items = makeItems(world, mapInfo2, entityInfo[2]);
  const flags = makeFlags(world, mapInfo2, entityInfo[2]);

  return {
    physics: { engine, world },
    player: MakePlayer(world, "blue", { x: 50, y: WINDOW_HEIGHT - 70 }, 28, 2),
    floor: FloorMaker(
      world,
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT - 5 },
      { height: FLOOR_WIDTH, width: WINDOW_WIDTH },
      "ironRow",
    ),
    topFloor: FloorMaker(
      world,
      { x: WINDOW_WIDTH / 2, y: +12 },
      { height: FLOOR_WIDTH, width: WINDOW_WIDTH },
      "ironRow",
    ),
    leftFloor: FloorMaker(
      world,
      { x: 0, y: WINDOW_HEIGHT / 2 },
      { height: WINDOW_HEIGHT, width: FLOOR_WIDTH },
      "ironColumn",
    ),
    rightFloor: FloorMaker(
      world,
      { x: WINDOW_WIDTH - 3, y: WINDOW_HEIGHT / 2 },
      { height: WINDOW_HEIGHT, width: FLOOR_WIDTH },
      "ironColumn",
    ),
    ...blocks,
    ...monsters,
    ...items,
    ...flags,
  };
}
