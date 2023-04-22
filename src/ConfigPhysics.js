import React from "react";
import Matter from "matter-js";
import { Dimensions } from "react-native";
import { DeviceMotion } from "expo-sensors";
import entityInfo from "./entities/entitiesInfo";
import makeMapInfo from "./utils/makeMap";
import stageSheet from "../assets/stageSheet.json";
import adjustDegree from "./utils/adjustDegree";

const translateMapY = false;
const translateMapX = false;
// const mapInfo = {
//   1: makeMapInfo(stageSheet[1], entityInfo[1]),
//   2: makeMapInfo(stageSheet[2], entityInfo[2]),
// };

export default function configPhysics(entities, { touches, dispatch }) {
  const { engine, world } = entities.physics;
  const player = entities.player.body;
  const { initialRotation } = entities;

  Matter.Engine.update(engine);
  engine.timing.delta = 1 / 80;

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
        x: adjust.applyGamma * adjust.responsiveNess * 0.9,
        y: adjust.applyBeta * adjust.responsiveNess * 0.9 * ratioXY,
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
