import Matter from "matter-js";
import { DeviceMotion } from "expo-sensors";
import entityInfo from "./entities/entitiesInfo";
import adjustDegree from "./utils/physicsUtils/adjustDegree";
import moveMonster from "./utils/physicsUtils/moveMonster";
import { disPatchInteractionWithItem } from "./utils/physicsUtils/checkBoundary";
import translateAllEntitiesX from "./utils/physicsUtils/translateMapX";
import translateAllEntitiesY from "./utils/physicsUtils/translateMapY";
import {
  setGuideMissileUnderHPTen,
  setThrowItemPositionTimely,
  setThrowPositionTimely,
} from "./utils/physicsUtils/bossUtils/setMonsterMissile";
import throwItems, {
  throwMonsters,
} from "./utils/physicsUtils/bossUtils/translateThrowing";
import detectAttackCollision from "./utils/detectAttackCollision";
import killMonster from "./utils/killMonster";

let translateMapY = false;
let translateMapX = false;
const movedHeight = 0;
const movedWidth = 0;

export default function usePhysics(entities, { touches, dispatch }) {
  const { engine, world } = entities.physics;
  const player = entities.player.body;
  const { stage, initialRotation } = entities;
  const monsterNumber = entityInfo[stage].monster.number;
  const monsterArray = Array.from({ length: monsterNumber }, (_, i) => i);
  const attackNumber = entityInfo[stage].attack.number;
  const attackArray = Array.from({ length: attackNumber }, (_, i) => i);

  Matter.Engine.update(engine);
  engine.timing.delta = 1 / 60;
  touches.filter((touch) => {
    if (touch.type === "press") {
      dispatch({ type: "pause" });
    }
  });

  if (!translateMapY && !translateMapX) {
    moveMonster(
      Matter,
      entities,
      entityInfo[stage].monster.specifics,
      "monster",
    );
    moveMonster(Matter, entities, entityInfo[stage].boss.specifics, "boss");
  }

  disPatchInteractionWithItem({ dispatch, entities });
  translateAllEntitiesX({
    translateMapX,
    dispatch,
    movedWidth,
    Matter,
    entities,
  });

  translateAllEntitiesY({
    translateMapY,
    movedHeight,
    Matter,
    entities,
    dispatch,
  });

  if (entities.round === 4) {
    setGuideMissileUnderHPTen({ Matter, entities });

    setThrowPositionTimely({ Matter, entities });

    monsterArray.forEach((entityNum) => {
      throwMonsters({ entities, Matter, entityNum });
    });

    setThrowItemPositionTimely({ Matter, entities });

    attackArray.forEach((entityNum) => {
      throwItems({ entities, Matter, entityNum });
    });
  }

  const movePlayer = (result, rotation) => {
    const ratioXY = 1.5;
    const adjust = adjustDegree(result, rotation);
    if (!translateMapX && !translateMapY) {
      Matter.Body.setVelocity(player, {
        x: adjust.applyGamma * adjust.responsiveNess,
        y: adjust.applyBeta * adjust.responsiveNess * ratioXY,
      });
    }
  };

  if (DeviceMotion.getListenerCount()) {
    DeviceMotion.removeAllListeners();
  }

  if (DeviceMotion.getListenerCount() < 1) {
    DeviceMotion.addListener((result) => {
      movePlayer(result, initialRotation);
    });
  }

  if (entities.specialMode) {
    entities.specialTime += 1;
    if (entities.specialTime >= 100) {
      entities.specialTime = 0;
      entities.specialMode = false;
      dispatch({ type: "off_specialItem" });
    }
  }

  Matter.Events.on(engine, "collisionStart", () => {
    if (stage === 2) {
      detectAttackCollision({ entities, Matter, dispatch });

      const flag1 = entities.flag1?.body;
      const arrivedFlag1 = Matter.Collision.collides(
        entities.player.body,
        flag1,
      );

      if (arrivedFlag1) {
        translateMapY = true;
        Matter.World.remove(world, flag1);
      }

      const flag2 = entities.flag2?.body;
      const arrivedFlag2 = Matter.Collision.collides(
        entities.player.body,
        flag2,
      );

      if (arrivedFlag2) {
        translateMapX = true;
        Matter.World.remove(world, flag2);
      }

      const flag3 = entities.flag3?.body;
      const arrivedFlag3 = Matter.Collision.collides(
        entities.player.body,
        flag3,
      );

      if (arrivedFlag3) {
        translateMapY = true;
        Matter.World.remove(world, flag3);
      }
    }

    monsterArray.forEach((num) => {
      const monsterEntity = entities[`monster${num + 1}`].body;
      const collision = Matter.Collision.collides(
        entities.player.body,
        monsterEntity,
      );
      if (collision) {
        if (entities.specialMode) {
          killMonster({
            Matter,
            entities,
            num,
            dispatch,
            collision,
          });
        } else if (entityInfo[stage].monster.specifics[num + 1].alive) {
          dispatch({ type: "game_over" });
        }
      }
    });
  });

  return entities;
}
