import { Dimensions } from "react-native";
import { settingBoss } from "./bossUtils/settingBoss";
import { translateEntitiesY } from "./translateEntity";
import entityInfo from "../../entities/entitiesInfo";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;

export default function translateAllEntitiesY({
  translateMapY,
  movedHeight,
  Matter,
  entities,
  dispatch,
}) {
  if (translateMapY) {
    const { stage, mapInfo } = entities;
    const monsterNumber = entityInfo[stage].monster.number;
    const itemNumber = entityInfo[stage].item.number;
    const itemArray = Array.from({ length: itemNumber }, (_, i) => i);
    const blockNumber = entityInfo[stage].block.renderEntity;
    const firstBlocksNum = entityInfo[stage].block.firstEntity;
    const firstBlockArray = Array.from({ length: firstBlocksNum }, (_, i) => i);
    const specialItemNumber = entityInfo[stage].special.number;
    const specialItemArray = Array.from(
      { length: specialItemNumber },
      (_, i) => i,
    );
    const flagNumber = entityInfo[stage].flag.number;

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

      dispatch({ type: "complete_move_y", payload: movedHeight });

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

      settingBoss({ entities, Matter, bossRound: 4 });
    }
  }
}
