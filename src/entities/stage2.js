import Matter from "matter-js";
import { Dimensions } from "react-native";
import MakePlayer from "../components/Player";
import MakeMonster from "../components/Monster";
import BlockMaker from "../components/Block";
import ItemMaker from "../components/Goal";
import makeMap from "../utils/makeMap";
import { sheet } from "../../assets/stageMaze.json";
import { makeBlocks, makeMonsters } from "../utils/makeEntities";
import Dynamic from "../../assets/dynamicImage";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;
const BLOCK_SIZE = GAME_WIDTH / 16;

export default function restart() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  engine.gravity.y = 0;

  const entity = {
    gridSize: BLOCK_SIZE,
    block: {
      number: 31,
      size: BLOCK_SIZE,
    },
    monster: {
      number: 4,
      size: 40,
    },
  };
  const mapInfo = makeMap(sheet, entity);

  const blocks = makeBlocks(world, mapInfo, entity);
  const monsters = makeMonsters(world, mapInfo, entity, Dynamic.rock);
  // const blocks = makeBlocks(
  //   world,
  //   { type: "s", number: 31 },
  //   BLOCK_SIZE,
  //   sheet,
  // );
  // const monsters = makeMonsters(
  //   world,
  //   "m",
  //   4,
  //   BLOCK_SIZE,
  //   40,
  //   sheet,
  //   Dynamic.rock,
  // );

  const blockLeftBottomX = (width) => {
    const leftBottomX = FLOOR_WIDTH / 2 + width / 2;
    return leftBottomX;
  };

  const blockLeftBottomY = (height) => {
    const leftBottomX = WINDOW_HEIGHT - FLOOR_WIDTH / 2 - height / 2;
    return leftBottomX;
  };

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
    topMonster: MakeMonster(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE * 2),
        y: blockLeftBottomY(BLOCK_SIZE * 2) - GAME_HEIGHT / 8 - BLOCK_SIZE * 20,
      },
      { height: 40, width: 40 },
      Dynamic.rock,
    ),
    // goal: ItemMaker(
    //   world,
    //   {
    //     x: blockLeftBottomX(BLOCK_SIZE * 2) + BLOCK_SIZE * 3,
    //     y: blockLeftBottomY(BLOCK_SIZE * 2) - GAME_HEIGHT / 8 - BLOCK_SIZE * 15.5 + 3,
    //   },
    //   { height: 60, width: 60 },
    //   "goal",
    // ),
  };
}
