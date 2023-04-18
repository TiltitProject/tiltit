import Matter from "matter-js";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import MakePlayer from "../components/Player";
import BlockMaker from "../components/Block";
import makeMap from "../utils/makeMap";
import { makeBlocks, makeMonsters, makeItems } from "../utils/makeEntities";
import entityInfo from "./entitiesInfo";
import stageSheet from "../../assets/stageSheet.json";
import { selectCurrentStage } from "../features/gameSlice";
import ItemMaker from "../components/Item";
import { apple } from "../../assets/static";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;

const mapInfo2 = makeMap(stageSheet[2], entityInfo[2]);
const mapInfo = makeMap(stageSheet[1], entityInfo[1]);

export default function Stage1() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  engine.gravity.y = 0;

  const blocks = makeBlocks(world, mapInfo2, entityInfo[2]);
  const monsters = makeMonsters(world, mapInfo2, entityInfo[2]);
  const items = makeItems(world, mapInfo2, entityInfo[2]);

  return {
    physics: { engine, world },
    player: MakePlayer(world, "blue", { x: 50, y: WINDOW_HEIGHT - 50 }, 28, 2),
    floor: BlockMaker(
      world,
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT - 5 },
      { height: FLOOR_WIDTH, width: WINDOW_WIDTH },
      "ironRow",
    ),
    topFloor: BlockMaker(
      world,
      { x: WINDOW_WIDTH / 2, y: +10 - GAME_HEIGHT },
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
    item1: ItemMaker(
      world,
      { x: 40, y: WINDOW_HEIGHT - 50 },
      { height: 40, width: 40 },
      apple,
      1,
    ),
    item2: ItemMaker(
      world,
      { x: 40, y: WINDOW_HEIGHT - 70 },
      { height: 40, width: 40 },
      apple,
      2,
    ),
    item3: ItemMaker(
      world,
      { x: 40, y: WINDOW_HEIGHT - 90 },
      { height: 40, width: 40 },
      apple,
      3,
    ),
    ...blocks,
    ...monsters,
    ...items
  };
}
