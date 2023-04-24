import Matter from "matter-js";
import { Dimensions } from "react-native";
import MakePlayer from "../components/Player";
import makeMap from "../utils/makeMap";
import {
  makeBlocks,
  makeMonsters,
  makeFlags,
  makeBossMonster,
  makeAttacks,
} from "../utils/makeEntities";
import entityInfo from "./entitiesInfo";
import stageSheet from "../../assets/stageSheet.json";
import FloorMaker from "../components/Floor";
import ItemMaker from "../components/Attack";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;
const BLOCK_SIZE = GAME_WIDTH / 16;
const FLOOR_WIDTH = 32;

export default function Stage2(stage) {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  engine.gravity.y = 0;
  const mapInfo = makeMap(stageSheet[stage], entityInfo[stage]);

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
    ...makeBlocks(world, mapInfo, entityInfo[stage]),
    ...makeMonsters(world, mapInfo, entityInfo[stage]),
    ...makeFlags(world, mapInfo, entityInfo[stage]),
    ...makeBossMonster(world, mapInfo, entityInfo[stage]),
    ...makeAttacks(world, mapInfo, entityInfo[stage]),
    stage,
    mapInfo,
    round: 1,
    translatedInfo: {
      x: 0,
      y: 0,
    },
    initialRotation: {
      gamma: 0,
      beta: 0,
    },
    specialMode: false,
    specialTime: 0,
  };
}
