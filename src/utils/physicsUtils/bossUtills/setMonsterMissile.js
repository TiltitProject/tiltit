import { Dimensions } from "react-native";
import entityInfo from "../../../entities/entitiesInfo";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;

export const setGuideMissileUnderHPTen = ({ Matter, entities }) => {
  const { stage } = entities;
  const bossHP = entityInfo[stage].boss.specifics[1].HP;
  const player = entities.player.body;

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
};

export const setThrowPositionTimely = ({ entities, Matter }) => {
  const { stage } = entities;
  const monsterSpecific = entityInfo[stage].monster.specifics;
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
};
