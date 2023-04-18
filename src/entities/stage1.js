import Matter from "matter-js";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import MakePlayer from "../components/Player";
import BlockMaker from "../components/Block";
import makeMap from "../utils/makeMap";
import { makeBlocks, makeMonsters } from "../utils/makeEntities";
import entityInfo from "./entitiesInfo";
import stageSheet from "../../assets/stageSheet.json";
import { selectCurrentStage } from "../features/gameSlice";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const mapInfo2 = makeMap(stageSheet[2], entityInfo[2]);
const mapInfo = makeMap(stageSheet[1], entityInfo[1]);

export default function Stage1() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  engine.gravity.y = 0;

  const blocks = makeBlocks(world, mapInfo, entityInfo[1]);
  const monsters = makeMonsters(world, mapInfo, entityInfo[1]);

  return {
    physics: { engine, world },
    player: MakePlayer(world, "blue", { x: 50, y: WINDOW_HEIGHT - 50 }, 28, 1),
    floor: BlockMaker(
      world,
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT + 5 },
      { height: FLOOR_WIDTH, width: WINDOW_WIDTH },
      "ironRow",
    ),
    topFloor: BlockMaker(
      world,
      { x: WINDOW_WIDTH / 2, y: +10 },
      { height: FLOOR_WIDTH, width: WINDOW_WIDTH },
      "ironRow",
    ),
    leftFloor: BlockMaker(
      world,
      { x: 0, y: WINDOW_HEIGHT / 2 },
      { height: WINDOW_HEIGHT, width: FLOOR_WIDTH },
      "ironColumn",
    ),
    rightFloor: BlockMaker(
      world,
      { x: WINDOW_WIDTH, y: WINDOW_HEIGHT / 2 },
      { height: WINDOW_HEIGHT, width: FLOOR_WIDTH },
      "ironColumn",
    ),
    ...blocks,
    ...monsters,
  };
}
