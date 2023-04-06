import Matter from "matter-js";

export default function Physics(entities, { touches, time, dispatch }) {
  const engine = entities.physics.engine;

  touches.filter((touch) => {
    if (touch.type === "press") {
      Matter.Body.setVelocity(entities.player.body, {
        x: 0,
        y: -8,
      });
    }
  });

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, "collisionStart", () => {
    dispatch({ type: "game_over" });
  });

  return entities;
}
