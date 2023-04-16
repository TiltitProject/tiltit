import Matter from "matter-js";
import { Dimensions } from "react-native";
import MakePlayer from "../components/Player";
import BlockMaker from "../components/Block";
import ItemMaker from "../components/Goal";
import makeMap from "../utils/makeMap";
import { sheet } from "../../assets/stageMaze.json";
import { makeBlocks, makeMonsters, makeItems } from "../utils/makeEntities";
import entityInfo from "./entitiesInfo";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;

export default function Restart() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  engine.gravity.y = 0;

  const mapInfo = makeMap(sheet, entityInfo);
  const blocks = makeBlocks(world, mapInfo, entityInfo);
  const monsters = makeMonsters(world, mapInfo, entityInfo);

  return {
    physics: { engine, world },
    player: MakePlayer(world, "blue", { x: 50, y: WINDOW_HEIGHT - 50 }, 28),
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
