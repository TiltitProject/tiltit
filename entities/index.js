import Matter from "matter-js";
import MakePlayer from "../components/Player";
import FloorMaker from "../components/Floor";
import MakeObstacle from "../components/Obstacle";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function restart() {
  const engine = Matter.Engine.create({ enableSleeping: false }); // true - 앱의 효율이 좋아지지만 물리엔진의 정확도가 희생된다

  const world = engine.world;

  engine.gravity.y = 0.4;

  return {
    physics: { engine, world },
    player: MakePlayer(
      world,
      "blue",
      { x: 50, y: 200 },
      { height: 40, width: 40 },
    ),
    floor: FloorMaker(
      world,
      "black",
      { x: windowWidth / 2, y: windowHeight },
      { height: 32, width: windowWidth },
    ),
    topFloor: FloorMaker(
      world,
      "black",
      { x: windowWidth / 2, y: 0 },
      { height: 32, width: windowWidth },
    ),
    leftFloor: FloorMaker(
      world,
      "black",
      { x: 0, y: windowHeight / 2 },
      { height: windowHeight, width: 32 },
    ),
    rightFloor: FloorMaker(
      world,
      "black",
      { x: windowWidth, y: windowHeight / 2 },
      { height: windowHeight, width: 32 },
    ),
    obstacleTop1: MakeObstacle(
      world,
      "obstacleTop1",
      "black",
      { x: 75 + 16, y: 70 },
      { height: 16, width: 150 },
    ),
  };
}
