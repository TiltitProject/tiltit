import Matter from "matter-js";
import { Dimensions } from "react-native";
import { DeviceMotion } from "expo-sensors";
import entityInfo from "./entities/entitiesInfo";
import adjustDegree from "./utils/adjustDegree";
import moveMonster from "./utils/moveMonster";
import makeReflectionAngle from "./utils/makeReflectionAngle";
import {
  translateEntitiesX,
  translateEntitiesY,
} from "./utils/translateEntity";
import playAudio from "./utils/playAudio";
import { swipe } from "../assets/audio";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;

let translateMapY = false;
let translateMapX = false;
let movedHeight = 0;
let movedWidth = 0;

export default function usePhysics(entities, { touches, dispatch }) {
  const { engine, world } = entities.physics;
  const player = entities.player.body;
  const { stage, mapInfo, initialRotation } = entities;
  const goalPosition = mapInfo.goal[1]?.position;
  const goalWidth = mapInfo.goal[1]?.size.width;
  const monsterNumber = entityInfo[stage].monster.number;
  const monsterArray = Array(monsterNumber)
    .fill(0)
    .map((_, i) => i);
  const itemNumber = entityInfo[stage].item.number;
  const itemArray = Array(itemNumber)
    .fill(0)
    .map((_, i) => i);
  const blockNumber = entityInfo[stage].block.renderEntity;
  const blockArray = Array(blockNumber)
    .fill(0)
    .map((_, i) => i);
  const firstBlocksNum = entityInfo[stage].block.firstEntity;
  const firstBlockArray = Array(firstBlocksNum)
    .fill(0)
    .map((_, i) => i);
  const specialItemNumber = entityInfo[stage].special.number;
  const specialItemArray = Array(specialItemNumber)
    .fill(0)
    .map((_, i) => i);
  const attackNumber = entityInfo[stage].attack.number;
  const attackArray = Array(attackNumber)
    .fill(0)
    .map((_, i) => i);

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

  itemArray.forEach((num) => {
    const itemPosition = mapInfo.item[num + 1].position;
    const itemWidth = mapInfo.item[num + 1].size.width;

    if (
      player.position.x > itemPosition.x - itemWidth &&
      player.position.x < itemPosition.x + itemWidth &&
      player.position.y > itemPosition.y - itemWidth &&
      player.position.y < itemPosition.y + itemWidth
    ) {
      dispatch({ type: "get_item", payload: num + 1 });
    }
  });

  specialItemArray.forEach((num) => {
    const itemPosition = mapInfo.special[num + 1].position;
    const itemWidth = mapInfo.special[num + 1].size.width;

    if (
      player.position.x > itemPosition.x - itemWidth / 2 &&
      player.position.x < itemPosition.x + itemWidth / 2 &&
      player.position.y > itemPosition.y - itemWidth / 2 &&
      player.position.y < itemPosition.y + itemWidth / 2
    ) {
      dispatch({ type: "get_specialItem", payload: num + 1 });
      entities.specialMode = true;
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

  if (translateMapX) {
    if (!movedWidth) {
      dispatch({ type: "move_page" });
    }

    if (movedWidth > -GAME_WIDTH) {
      movedWidth -= 5;

      Matter.Body.setVelocity(entities.player.body, {
        x: 0,
        y: 0,
      });

      Matter.Body.translate(entities.player.body, { x: -5, y: 0 });

      translateEntitiesX(blockNumber, -5, "block", entities, Matter);
      translateEntitiesX(flagNumber, -5, "flag", entities, Matter);
      translateEntitiesX(monsterNumber, -5, "monster", entities, Matter);

      Matter.Body.translate(entities.boss1.body, {
        x: -5,
        y: 0,
      });
    } else {
      dispatch({ type: "complete_move_row", payload: movedWidth });

      itemArray.forEach((num) => {
        mapInfo.item[num + 1].position.x += movedWidth;
      });

      specialItemArray.forEach((num) => {
        mapInfo.special[num + 1].position.x += movedWidth;
      });

      translateMapX = false;
      entities.round += 1;
      entities.translatedInfo.x += movedWidth;
      movedWidth = 0;
    }
  }

  if (translateMapY) {
    if (!movedHeight) {
      dispatch({ type: "move_page" });
    }
    if (movedHeight < GAME_HEIGHT) {
      movedHeight += 10;

      Matter.Body.setVelocity(entities.player.body, {
        x: 0,
        y: 0,
      });

      Matter.Body.translate(entities.player.body, { x: 0, y: 10 });

      translateEntitiesY(blockNumber, 10, "block", entities, Matter);
      translateEntitiesY(flagNumber, 10, "flag", entities, Matter);
      translateEntitiesY(monsterNumber, 10, "monster", entities, Matter);

      Matter.Body.translate(entities.boss1.body, {
        x: 0,
        y: 10,
      });
    } else {
      firstBlockArray.forEach((entityNum) => {
        Matter.Body.setPosition(entities[`block${entityNum + 1}`].body, {
          x: mapInfo.block[entityNum + 38].position.x,
          y: mapInfo.block[entityNum + 38].position.y + movedHeight,
        });
      });

      Matter.Body.translate(entities.player.body, { x: 0, y: 10 });

      dispatch({ type: "complete_move_upper", payload: movedHeight });

      itemArray.forEach((num) => {
        mapInfo.item[num + 1].position.y += movedHeight;
      });

      specialItemArray.forEach((num) => {
        mapInfo.special[num + 1].position.y += movedHeight;
      });

      entities.round += 1;
      translateMapY = false;
      entities.translatedInfo.y += movedHeight;
      movedHeight = 0;

      if (entities.round === 4) {
        entityInfo[stage].attack.specifics[1].onPosition = true;
        Matter.Body.setPosition(entities.attack1.body, {
          x: player.position.x,
          y: player.position.y - player.circleRadius,
        });

        entityInfo[stage].monster.specifics[1].onPosition = true;
        Matter.Body.setPosition(entities.monster1.body, {
          x: entities.boss1.body.position.x,
          y: entities.boss1.body.bounds.max.y,
        });

        blockArray.forEach((entityNum) => {
          Matter.World.remove(world, entities[`block${entityNum + 1}`].body);
        });
      }
    }
  }

  if (entities.round === 4) {
    const bossHP = entityInfo[stage].boss.specifics[1].HP;
    const monsterSpecific = entityInfo[stage].monster.specifics;

    if (bossHP === 10) {
      Matter.Body.setPosition(entities.monster3.body, {
        x: entities.boss1.body.position.x,
        y: entities.boss1.body.position.y,
      });
      entityInfo[stage].monster.specifics[3].guideMissile = {
        x: (player.position.x - entities.boss1.body.position.x) / 40,
        y: (player.position.y - entities.boss1.body.position.y) / 40,
      };
    }

    const MonsterPositionTimer = entityInfo[stage].monster.specifics[1].moved;

    if (
      MonsterPositionTimer > (GAME_HEIGHT / 3) * 1 &&
      monsterSpecific[2].onPosition === false
    ) {
      monsterSpecific[2].onPosition = true;
      Matter.Body.setPosition(entities.monster2.body, {
        x: entities.boss1.body.bounds.min.x,
        y: entities.boss1.body.bounds.max.y,
      });
    }

    if (
      MonsterPositionTimer > (GAME_HEIGHT / 3) * 2 &&
      monsterSpecific[5].onPosition === false
    ) {
      monsterSpecific[5].onPosition = true;
      Matter.Body.setPosition(entities.monster5.body, {
        x: entities.boss1.body.bounds.max.x,
        y: entities.boss1.body.bounds.max.y,
      });
    }

    monsterArray.forEach((entityNum) => {
      const specifics = entityInfo[stage].monster.specifics[entityNum + 1];

      if (specifics.onPosition) {
        Matter.Body.translate(entities[`monster${entityNum + 1}`].body, {
          x: 0,
          y: 7,
        });

        specifics.moved += 7;

        if (specifics.moved > GAME_HEIGHT) {
          specifics.moved = 0;
          Matter.Body.setPosition(entities[`monster${entityNum + 1}`].body, {
            x: entities.boss1.body.position.x,
            y: entities.boss1.body.bounds.max.y,
          });
        }
      }
      if (specifics.guideMissile) {
        Matter.Body.translate(entities[`monster${entityNum + 1}`].body, {
          x: specifics.guideMissile.x,
          y: specifics.guideMissile.y,
        });
        specifics.moved += specifics.guideMissile.y;

        if (specifics.moved > GAME_HEIGHT) {
          specifics.moved = 0;
          Matter.Body.setPosition(entities[`monster${entityNum + 1}`].body, {
            x: entities.boss1.body.position.x,
            y: entities.boss1.body.bounds.max.y,
          });
          specifics.guideMissile = {
            x: (player.position.x - entities.boss1.body.position.x) / 40,
            y: (player.position.y - entities.boss1.body.position.y) / 40,
          };
        }
      }
    });

    const positionTimer = entityInfo[stage].attack.specifics[1].moved;

    if (
      positionTimer > (GAME_HEIGHT / 3) * 1 &&
      entityInfo[stage].attack.specifics[2].onPosition === false
    ) {
      entityInfo[stage].attack.specifics[2].onPosition = true;
      Matter.Body.setPosition(entities.attack2.body, {
        x: player.position.x,
        y: player.position.y - player.circleRadius,
      });
    }

    if (
      positionTimer > (GAME_HEIGHT / 3) * 2 &&
      entityInfo[stage].attack.specifics[3].onPosition === false
    ) {
      entityInfo[stage].attack.specifics[3].onPosition = true;
      Matter.Body.setPosition(entities.attack2.body, {
        x: player.position.x,
        y: player.position.y - player.circleRadius,
      });
    }

    attackArray.forEach((entityNum) => {
      const specifics = entityInfo[stage].attack.specifics[entityNum + 1];

      if (specifics.onPosition) {
        if (specifics.moved === 0) {
          playAudio(swipe);
        }
        Matter.Body.translate(entities[`attack${entityNum + 1}`].body, {
          x: 0,
          y: -20,
        });
        specifics.moved += 20;

        if (specifics.moved > GAME_HEIGHT) {
          specifics.moved = 0;
          Matter.Body.setPosition(entities[`attack${entityNum + 1}`].body, {
            x: player.position.x,
            y: player.position.y - player.circleRadius,
          });
        }
      }
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
      const boss = entities.boss1?.body;

      attackArray.forEach((entityNum) => {
        const attack = entities[`attack${entityNum + 1}`].body;
        const hit = Matter.Collision.collides(boss, attack);

        if (hit) {
          dispatch({ type: "hit_boss", payload: entityNum + 1 });
          Matter.Body.setPosition(attack, {
            x: player.position.x,
            y: -WINDOW_HEIGHT,
          });
          entityInfo[stage].boss.specifics[1].HP -= 1;
        }
      });

      const flag1 = entities.flag1?.body;
      const arrivedFlag1 = Matter.Collision.collides(
        entities.player.body,
        flag1,
      );

      const flag3 = entities.flag3?.body;
      const arrivedFlag3 = Matter.Collision.collides(
        entities.player.body,
        flag3,
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
          Matter.Body.setPosition(monsterEntity, {
            x: monsterEntity.position.x + player.velocity.x * 2,
            y: monsterEntity.position.y + player.velocity.y * 2,
          });

          const reflectionAngle = makeReflectionAngle(collision, player);

          Matter.World.remove(world, monsterEntity);
          entityInfo[stage].monster.specifics[num + 1].alive = false;

          dispatch({
            type: "kill_monster",
            payload: {
              number: num + 1,
              x:
                Math.cos(reflectionAngle) * -player.velocity.x -
                Math.sin(reflectionAngle) * -player.velocity.y +
                player.velocity.x,
              y:
                Math.sin(reflectionAngle) * -player.velocity.x +
                Math.cos(reflectionAngle) * -player.velocity.y +
                player.velocity.y,
            },
          });
        } else if (entityInfo[stage].monster.specifics[num + 1].alive) {
          dispatch({ type: "game_over" });
        }
      }
    });
  });

  return entities;
}
