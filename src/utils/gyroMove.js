import Matter from "matter-js";
import { DeviceMotion } from "expo-sensors";

export function accelerateCharacter(entities) {
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

export function applyVelocityCharacter(entities) {
  const move = (event) => {
    console.log("move");
    const degree45 = 0.785;
    const { beta, gamma } = event.rotation;
    let limitGamma = gamma;
    let limitBeta = beta;
    if (gamma > 0.6) {
      limitGamma = 0.6;
    }
    if (gamma < -0.6) {
      limitGamma = -0.6;
    }
    if (beta - degree45 > 0.6) {
      limitBeta = 0.6;
    }
    if (beta - degree45 < -0.6) {
      limitBeta = -0.6;
    }
    return Matter.Body.setVelocity(entities.player.body, {
      x: limitGamma * 7,
      y: (limitBeta - degree45) * 7,
    });
  };
  DeviceMotion.addListener(move);

  return () => {
    DeviceMotion.removeListener(move);
  };
  // DeviceMotion.setUpdateInterval(10);
  // const MAX_SPEED = 1;
  // const { velocity } = entities.player.body;
  // const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  // let lastGamma = JSON.parse(JSON.stringify(gamma));
  // let lastBeta = JSON.parse(JSON.stringify(beta));
  // console.log(gamma, beta, "law");
  // console.log(lastGamma, lastBeta, "last");
  // if (Math.abs(beta - lastBeta) < 0.02 && Math.abs(gamma - lastGamma) < 0.02) {
  //   lastGamma = JSON.parse(JSON.stringify(gamma));
  //   lastBeta = JSON.parse(JSON.stringify(beta));
  //   const speed = Math.sqrt(gamma * gamma + beta * beta);
  //   console.log(speed);
  // }
  // if (gamma > 1) {
  //   limitGamma = 1;
  // }
  // if (gamma < -1) {
  //   limitGamma = -1;
  // }
  // if (beta > 1) {
  //   limitBeta = 1;
  // }
  // if (beta < -1) {
  //   limitBeta = -1;
  // }
  // console.log(speed);
  // if (speed > MAX_SPEED) {
  //   const ratio = MAX_SPEED / speed;
  //   Matter.Body.setVelocity(entities.player.body, {
  //     x: velocity.x * ratio,
  //     y: velocity.y * ratio,
  //   });
  // }
  // Matter.Body.setVelocity(entities.player.body, {
  //   x: limitGamma * 10,
  //   y: (limitBeta - degree45) * 10,
  // });
  // });
}
