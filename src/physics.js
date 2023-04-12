import Matter from "matter-js";
import { Dimensions } from "react-native";
import { applyVelocityCharacter } from "./utils/gyroMove";

const windowWidth = Dimensions.get("window").width;

let moveRight = true;
let moveLeft = false;

export default function physics(entities, { touches, time, dispatch }) {
  const { engine } = entities.physics;

  Matter.Engine.update(engine, time.delta);

  if (entities.topMonster.body.position.x >= windowWidth * 0.9) {
    moveRight = false;
    moveLeft = true;
  } else if (entities.topMonster.body.position.x <= windowWidth * 0.1) {
    moveRight = true;
    moveLeft = false;
  }

  if (moveRight) {
    Matter.Body.translate(entities.topMonster.body, { x: 3, y: 0 });
  } else if (moveLeft) {
    Matter.Body.translate(entities.topMonster.body, { x: -3, y: 0 });
  }

  touches.filter((touch) => {
    if (touch.type === "press") {
      dispatch({ type: "pause" });
    }
  });

  applyVelocityCharacter(entities);

  Matter.Events.on(engine, "collisionStart", () => {
    const collision = Matter.Collision.collides(
      entities.player.body,
      entities.topMonster.body,
    );
    if (collision) {
      dispatch({ type: "game_over" });
    }
  });

  return entities;
}
