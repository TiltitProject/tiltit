import React from "react";
import Matter from "matter-js";
import { Dimensions } from "react-native";
import { DeviceMotion } from "expo-sensors";
import entityInfo from "./entities/entitiesInfo";
import makeMapInfo from "./utils/makeMap";
import stageSheet from "../assets/stageSheet.json";
import adjustDegree from "./utils/adjustDegree";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;

let translateMapY = false;
let translateMapX = false;
let movedHeight = 0;
let movedWidth = 0;
// const mapInfo = {
//   1: makeMapInfo(stageSheet[1], entityInfo[1]),
//   2: makeMapInfo(stageSheet[2], entityInfo[2]),
// };

export default function usePhysics(entities, { touches, dispatch }) {
  const { engine, world } = entities.physics;
  const player = entities.player.body;
  const { stage, mapInfo } = entities;
  const goalPosition = mapInfo.goal[1]?.position;
  const goalWidth = mapInfo.goal[1]?.size.width;
  const monsterNumber = entityInfo[stage].monster.number;
  const monsterArray = Array.from(Array(monsterNumber).keys());
  const itemNumber = entityInfo[stage].item.number;
  const itemArray = Array.from(Array(itemNumber).keys());
  const blockNumber = entityInfo[stage].block.renderEntity;
  const blockArray = Array.from(Array(blockNumber).keys());
  const firstBlocksNum = entityInfo[stage].block.firstEntity;
  const firstBlockArray = Array.from(Array(firstBlocksNum).keys());
  // const firstItemNum = entityInfo[stage].item.firstEntity;
  // const firstItemArray = Array.from(Array(firstItemNum).keys());
  // const firstMonsterNum = entityInfo[stage].monster.firstEntity;
  // const firstMonsterArray = Array.from(Array(firstMonsterNum).keys());
  // console.log(entities.lastPosition)
  // const distance = Matter.Vector.magnitude(
  //   Matter.Vector.sub(player.position, mapInfo.lastPosition),
  // );

  // if (distance > 7) {
  //   mapInfo.lastPosition = player.position;
  //   dispatch({ type: "change_index" });
  // }

  // Matter.Body.set(player, player.label, "changed");

  Matter.Engine.update(engine);
  engine.timing.delta = 1 / 80;
  touches.filter((touch) => {
    if (touch.type === "press") {
      dispatch({ type: "pause" });
    }
  });

  const moveRow = (specifics) => {
    Object.keys(specifics).forEach((num) => {
      const monster = entities[`monster${num}`].body;
      const moveAxis = specifics[num].axis;
      const stopAxis = moveAxis === "x" ? "y" : "x";
      const moveDistance = specifics[num].distance;
      const { round, translateMap } = specifics[num];
      const translateInfo = translateMap[moveAxis];
      const translatedPixel = entities.translatedInfo[moveAxis];
      const appliedPosition = translateInfo * translatedPixel;

      if (entities.round === round) {
        if (
          monster.position[moveAxis] >=
          monster.initialPosition[moveAxis] + appliedPosition + moveDistance
        ) {
          specifics[num].changeMove = true;
        } else if (
          monster.position[moveAxis] <=
          monster.initialPosition[moveAxis] + appliedPosition - moveDistance
        ) {
          specifics[num].changeMove = false;
        }

        if (!specifics[num].changeMove) {
          Matter.Body.translate(monster, {
            [moveAxis]: specifics[num].speed,
            [stopAxis]: 0,
          });
        } else {
          Matter.Body.translate(monster, {
            [moveAxis]: -specifics[num].speed,
            [stopAxis]: 0,
          });
        }
      }
    });
  };
  if (!translateMapY && !translateMapX) {
    moveRow(entityInfo[stage].monster.specifics);
  }

  itemArray.forEach((num) => {
    const itemPosition = mapInfo.item[num + 1].position;
    const itemWidth = mapInfo.item[num + 1].size.width;

    if (
      player.position.x > itemPosition.x - itemWidth / 2 &&
      player.position.x < itemPosition.x - itemWidth / 2 + itemWidth &&
      player.position.y > itemPosition.y - itemWidth / 2 &&
      player.position.y < itemPosition.y - itemWidth / 2 + itemWidth
    ) {
      dispatch({ type: "get_item", payload: num + 1 });
    }
  });

  if (
    goalPosition &&
    player.position.x > goalPosition.x - goalWidth / 2 &&
    player.position.x < goalPosition.x + goalWidth / 2 &&
    player.position.y > goalPosition.y - goalWidth / 2 &&
    player.position.y < goalPosition.y + goalWidth / 2
  ) {
    dispatch({ type: "clear" });
  }

  const flagNumber = entityInfo[stage].flag.number;
  const flagArray = Array.from(Array(flagNumber).keys());

  if (translateMapX) {
    if (movedWidth > -GAME_WIDTH) {
      dispatch({ type: "move_page" });
      movedWidth -= 5;

      Matter.Body.setVelocity(entities.player.body, {
        x: 0,
        y: 0,
      });

      Matter.Body.translate(entities.player.body, { x: -5, y: 0 });

      blockArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`block${entityNum + 1}`].body, {
          x: -5,
          y: 0,
        });
      });

      flagArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`flag${entityNum + 1}`].body, {
          x: -5,
          y: 0,
        });
      });

      monsterArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`monster${entityNum + 1}`].body, {
          x: -5,
          y: 0,
        });
      });
    } else {
      dispatch({ type: "complete_move_row", payload: movedWidth });
      itemArray.forEach((num) => {
        mapInfo.item[num + 1].position.x += movedWidth;
      });
      translateMapX = false;
      entities.round += 1;
      entities.translatedInfo.x += movedWidth;
      movedWidth = 0;
    }
  }

  if (translateMapY) {
    if (movedHeight < GAME_HEIGHT) {
      dispatch({ type: "move_page" });
      movedHeight += 10;

      Matter.Body.setVelocity(entities.player.body, {
        x: 0,
        y: 0,
      });

      Matter.Body.translate(entities.player.body, { x: 0, y: 10 });

      blockArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`block${entityNum + 1}`].body, {
          x: 0,
          y: 10,
        });
      });

      flagArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`flag${entityNum + 1}`].body, {
          x: 0,
          y: 10,
        });
      });

      monsterArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`monster${entityNum + 1}`].body, {
          x: 0,
          y: 10,
        });
      });
    } else {
      firstBlockArray.forEach((entityNum) => {
        Matter.Body.setPosition(entities[`block${entityNum + 1}`].body, {
          x: mapInfo.block[entityNum + 39].position.x,
          y: mapInfo.block[entityNum + 39].position.y + movedHeight,
        });
      });

      dispatch({ type: "complete_move_upper", payload: movedHeight });
      itemArray.forEach((num) => {
        mapInfo.item[num + 1].position.y += movedHeight;
      });
      entities.round += 1;
      translateMapY = false;
      entities.translatedInfo.y += movedHeight;
      movedHeight = 0;
    }
  }

  const movePlayer = (result) => {
    const ratioXY = 1.5;
    const adjust = adjustDegree(result);
    if (!translateMapX && !translateMapY) {
      Matter.Body.setVelocity(player, {
        x: adjust.applyGamma * adjust.responsiveNess,
        y: adjust.applyBeta * adjust.responsiveNess * ratioXY,
      });
    }
  };
  DeviceMotion.removeAllListeners();

  if (DeviceMotion.getListenerCount() < 1) {
    DeviceMotion.addListener((result) => {
      movePlayer(result);
    });
  }

  Matter.Events.on(engine, "collisionStart", () => {
    if (stage === 2) {
      const flag1 = entities.flag1?.body;
      const arrivedFlag1 = Matter.Collision.collides(
        entities.player.body,
        flag1,
      );

      const flag2 = entities.flag2?.body;
      const arrivedFlag2 = Matter.Collision.collides(
        entities.player.body,
        flag2,
      );

      if (arrivedFlag2) {
        translateMapX = true;
        Matter.World.remove(world, flag2);
      }

      if (arrivedFlag1) {
        translateMapY = true;
        Matter.World.remove(world, flag1);
      }
    }

    monsterArray.forEach((num) => {
      const monster = `monster${num + 1}`;
      const collision = Matter.Collision.collides(
        entities.player.body,
        entities[monster].body,
      );
      if (collision) {
        dispatch({ type: "game_over" });
      }
    });
  });

  return entities;
}
