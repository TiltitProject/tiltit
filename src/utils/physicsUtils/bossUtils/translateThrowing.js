import { Dimensions } from "react-native";
import { swipe } from "../../../../assets/audio";
import entityInfo from "../../../entities/entitiesInfo";
import playAudio from "../../playAudio";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;

export const throwItems = ({ entities, Matter, entityNum }) => {
  const { stage } = entities;
  const player = entities.player.body;
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
};

export const throwMonsters = ({ entities, Matter, entityNum }) => {
  const { stage } = entities;
  const player = entities.player.body;
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
};
