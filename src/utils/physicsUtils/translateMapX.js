import { Dimensions } from "react-native";
import { translateEntitiesX } from "./translateEntity";
import entityInfo from "../../entities/entitiesInfo";

const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;

export default function translateAllEntitiesX({
  translateMapX,
  dispatch,
  movedWidth,
  Matter,
  entities,
}) {
  const { stage, mapInfo } = entities;
  const monsterNumber = entityInfo[stage].monster.number;
  const itemNumber = entityInfo[stage].item.number;
  const itemArray = Array.from({ length: itemNumber }, (_, i) => i);
  const blockNumber = entityInfo[stage].block.renderEntity;
  const specialItemNumber = entityInfo[stage].special.number;
  const flagNumber = entityInfo[stage].flag.number;
  const specialItemArray = Array.from(
    { length: specialItemNumber },
    (_, i) => i,
  );

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
      dispatch({ type: "complete_move_x", payload: movedWidth });

      itemArray.forEach((num) => {
        mapInfo.item[num + 1].position.x += movedWidth;
      });

      specialItemArray.forEach((num) => {
        mapInfo.special[num + 1].position.x += movedWidth;
      });

      translateMapX = false;
      // 변뎡되는지 기기 확인 필요
      entities.round += 1;
      entities.translatedInfo.x += movedWidth;
      movedWidth = 0;
    }
  }
}
