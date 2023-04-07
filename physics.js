import Matter from "matter-js";
import { DeviceMotion } from "expo-sensors";

export default function Physics(entities, { time, dispatch }) {
  const { engine } = entities.physics;

  Matter.Engine.update(engine, time.delta);

  DeviceMotion.addListener((result) => {
    const { beta, gamma } = result.rotation;

    Matter.Body.setVelocity(entities.player.body, {
      x: gamma * 10,
      y: beta * 10,
    });

    Matter.Body.applyForce(
      entities.player.body,
      entities.player.body.position,
      { x: gamma / 20000, y: beta / 20000 },
    );
  });

  Matter.Events.on(engine, "collisionStart", () => {
    dispatch({ type: "game_over" });
  });

  return entities;
}
