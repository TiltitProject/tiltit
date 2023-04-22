import Matter from "matter-js";
import MakePlayer from "../components/Player";
import FloorMaker from "../components/Floor";

const FLOOR_WIDTH = 32;
const WINDOW_HEIGHT = FLOOR_WIDTH * 15;
const WINDOW_WIDTH = FLOOR_WIDTH * 8;

export default function ConfigStage() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  engine.gravity.y = 0;

  return {
    physics: { engine, world },
    player: MakePlayer(world, "blue", { x: 50, y: WINDOW_HEIGHT - 70 }, 28, 2),
    floor: FloorMaker(
      world,
      {
        x: WINDOW_WIDTH / 2 - FLOOR_WIDTH / 2,
        y: WINDOW_HEIGHT - FLOOR_WIDTH / 2,
      },
      { height: FLOOR_WIDTH, width: WINDOW_WIDTH },
      "ironRow",
    ),
    topFloor: FloorMaker(
      world,
      { x: WINDOW_WIDTH / 2 - FLOOR_WIDTH / 2, y: FLOOR_WIDTH / 2 },
      { height: FLOOR_WIDTH, width: WINDOW_WIDTH },
      "ironRow",
    ),
    leftFloor: FloorMaker(
      world,
      { x: 0 - FLOOR_WIDTH / 2, y: WINDOW_HEIGHT / 2 },
      { height: WINDOW_HEIGHT, width: FLOOR_WIDTH },
      "ironColumn",
    ),
    rightFloor: FloorMaker(
      world,
      { x: WINDOW_WIDTH - FLOOR_WIDTH / 2, y: WINDOW_HEIGHT / 2 },
      { height: WINDOW_HEIGHT, width: FLOOR_WIDTH },
      "ironColumn",
    ),
    initialRotation: {
      gamma: 0,
      beta: 0,
    }
  };
}
