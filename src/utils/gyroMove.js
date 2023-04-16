import Matter from "matter-js";
import { DeviceMotion } from "expo-sensors";

export default function accelerateCharacter(entities) {
  const degree45 = 0.785;

  DeviceMotion.addListener((result) => {
    const { beta, gamma } = result.rotation;

    Matter.Body.applyForce(
      entities.player.body,
      entities.player.body.position,
      { x: gamma / 20000, y: (beta - degree45) / 20000 },
    );
  });
}
