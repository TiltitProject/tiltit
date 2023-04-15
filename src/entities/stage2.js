import Matter from "matter-js";
import { Dimensions } from "react-native";
import MakePlayer from "../components/Player";
import MakeMonster from "../components/Monster";
import BlockMaker from "../components/Block";
import ItemMaker from "../components/Goal";
import makeMap from "../utils/makeMap";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;
const BLOCK_SIZE = GAME_WIDTH / 16;

export default function restart() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  const map = makeMap();
  engine.gravity.y = 0;

  console.log(map[1].position);
  console.log(map[1].size);


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
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT },
      { height: FLOOR_WIDTH, width: WINDOW_WIDTH },
      "ironRow",
    ),
    topFloor: BlockMaker(
      world,
      { x: WINDOW_WIDTH / 2, y: -200 },
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
    block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    block2: BlockMaker(world, map[2].position, map[2].size, "brownRow"),
    block3: BlockMaker(world, map[3].position, map[3].size, "brownRow"),
    block4: BlockMaker(world, map[4].position, map[4].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    // block1: BlockMaker(world, map[1].position, map[1].size, "brownRow"),
    topMonster: MakeMonster(
      world,
      "obstacleTop1",
      "black",
      {
        x: blockLeftBottomX(BLOCK_SIZE * 2),
        y: blockLeftBottomY(BLOCK_SIZE * 2) - GAME_HEIGHT / 8 - BLOCK_SIZE * 20,
      },
      { height: 40, width: 40 },
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
