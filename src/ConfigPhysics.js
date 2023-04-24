import Matter from "matter-js";
import { DeviceMotion } from "expo-sensors";
import adjustDegree from "./utils/adjustDegree";

const translateMapY = false;
const translateMapX = false;


export default function configPhysics(entities, { touches, dispatch }) {
  const { engine } = entities.physics;
  const player = entities.player.body;
  const { initialRotation } = entities;

  Matter.Engine.update(engine);
  engine.timing.delta = 1 / 60;

  touches.filter((touch) => {
    if (touch.type === "press") {
      dispatch({ type: "pause" });
    }
  });

  const movePlayer = (result, rotation) => {
    const ratioXY = 1.5;
    const adjust = adjustDegree(result, rotation);
    if (!translateMapX && !translateMapY) {
      Matter.Body.setVelocity(player, {
        x: adjust.applyGamma * adjust.responsiveNess * 0.8,
        y: adjust.applyBeta * adjust.responsiveNess * 0.8 * ratioXY,
      });
    }
  };
  DeviceMotion.removeAllListeners();

  if (DeviceMotion.getListenerCount() < 1) {
    DeviceMotion.addListener((result) => {
      movePlayer(result, initialRotation);
    });
  }

  return entities;
}
