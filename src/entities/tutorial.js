import Matter from "matter-js";
import { Dimensions } from "react-native";
import MakePlayer from "../components/Player";
import MakeMonster from "./utils/makeMonster";
import BlockMaker from "../components/Block";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;
const BLOCK_SIZE = 32;

export default function restart() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  engine.gravity.y = 0;

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
    player: MakePlayer(world, "blue", { x: 50, y: WINDOW_HEIGHT - 50 }, 30),
    floor: BlockMaker(
      world,
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT },
      { height: FLOOR_WIDTH, width: WINDOW_WIDTH },
      "ironRow",
    ),
    topFloor: BlockMaker(
      world,
      { x: WINDOW_WIDTH / 2, y: 0 },
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
    block1: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE * 9),
        y: blockLeftBottomY(BLOCK_SIZE) - GAME_HEIGHT / 8,
      },
      { height: BLOCK_SIZE, width: BLOCK_SIZE * 9 },
      "brownRow",
    ),
    block2: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE) + BLOCK_SIZE * 9,
        y: blockLeftBottomY(BLOCK_SIZE * 18) - GAME_HEIGHT / 8,
      },
      { height: BLOCK_SIZE * 18, width: BLOCK_SIZE },
      "brownColumn",
    ),
    block3: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE * 6) + BLOCK_SIZE * 4,
        y: blockLeftBottomY(BLOCK_SIZE) - GAME_HEIGHT / 8 - BLOCK_SIZE * 18,
      },
      { height: BLOCK_SIZE, width: BLOCK_SIZE * 6 },
      "brownRow",
    ),
    block4: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE * 2) + BLOCK_SIZE * 2,
        y: blockLeftBottomY(BLOCK_SIZE * 2) - GAME_HEIGHT / 8 - BLOCK_SIZE * 18,
      },
      { height: BLOCK_SIZE * 2, width: BLOCK_SIZE * 2 },
      "goldTwice",
    ),
    block5: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE) + BLOCK_SIZE * 2,
        y: blockLeftBottomY(BLOCK_SIZE * 12) - GAME_HEIGHT / 8 - BLOCK_SIZE * 6,
      },
      { height: BLOCK_SIZE * 12, width: BLOCK_SIZE },
      "brownColumn",
    ),
    block6: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE * 3) + BLOCK_SIZE * 2,
        y: blockLeftBottomY(BLOCK_SIZE) - GAME_HEIGHT / 8 - BLOCK_SIZE * 5,
      },
      { height: BLOCK_SIZE, width: BLOCK_SIZE * 3 },
      "brownRow",
    ),
    block7: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE * 3) + BLOCK_SIZE * 3,
        y: blockLeftBottomY(BLOCK_SIZE) - GAME_HEIGHT / 8 - BLOCK_SIZE * 14.5,
      },
      { height: BLOCK_SIZE, width: BLOCK_SIZE * 3 },
      "brownRow",
    ),
    block8: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE * 2) + BLOCK_SIZE * 5,
        y:
          blockLeftBottomY(BLOCK_SIZE * 2) -
          GAME_HEIGHT / 8 -
          BLOCK_SIZE * 12.5,
      },
      { height: BLOCK_SIZE * 2, width: BLOCK_SIZE * 2 },
      "goldTwice",
    ),
    block9: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE) + BLOCK_SIZE * 6.5,
        y:
          blockLeftBottomY(BLOCK_SIZE * 9) - GAME_HEIGHT / 8 - BLOCK_SIZE * 3.5,
      },
      { height: BLOCK_SIZE * 9, width: BLOCK_SIZE },
      "brownColumn",
    ),
    block10: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE * 6) + BLOCK_SIZE * 1.5,
        y: blockLeftBottomY(BLOCK_SIZE) - GAME_HEIGHT / 8 - BLOCK_SIZE * 2.5,
      },
      { height: BLOCK_SIZE, width: BLOCK_SIZE * 6 },
      "brownRow",
    ),
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
