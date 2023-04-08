import Matter from "matter-js";
import { applyVelocityCharacter } from "./utils/applyVelocity";

export default function physics(entities, { time, dispatch }) {
  const { engine } = entities.physics;

  Matter.Engine.update(engine, time.delta);

  applyVelocityCharacter(entities);

  Matter.Events.on(engine, "collisionStart", () => {
    dispatch({ type: "game_over" });
  });

  return entities;
}
