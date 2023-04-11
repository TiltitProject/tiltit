import Matter from "matter-js";
import { applyVelocityCharacter } from "./utils/gyroMove";

export default function physics(entities, { touches, time, dispatch }) {
  const { engine } = entities.physics;

  Matter.Engine.update(engine, time.delta);

  touches.filter((touch) => {
    if (touch.type === "press") {
      dispatch({ type: "pause" });
    }
  });

  applyVelocityCharacter(entities);

  Matter.Events.on(engine, "collisionStart", () => {
    const collision = Matter.Collision.collides(
      entities.player.body,
      entities.obstacleTop1.body,
    );
    if (collision) {
      dispatch({ type: "game_over" });
    }
  });

  return entities;
}
