import Matter from "matter-js";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

let moveRight = true;
let moveLeft = false;

export default function Physics(entities, { touches, dispatch }) {
  const { engine } = entities.physics;

  Matter.Engine.update(engine);
  engine.timing.delta = 1 / 80;

  touches.filter((touch) => {
    if (touch.type === "press") {
      dispatch({ type: "pause" });
    }
  });

  Matter.Events.on(engine, "collisionStart", () => {
    const collision = Matter.Collision.collides(
      entities.player.body,
      entities.topMonster.body,
    );
    if (collision) {
      delete entities.item;

      dispatch({ type: "game_over" });
    }
  });

  return entities;
}
