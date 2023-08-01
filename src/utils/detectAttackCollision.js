import { Dimensions } from "react-native";
import entityInfo from "../entities/entitiesInfo";

const WINDOW_HEIGHT = Dimensions.get("window").height;

export default function detectAttackCollision({ entities, Matter, dispatch }) {
  const boss = entities.boss1?.body;
  const player = entities.player.body;
  const { stage } = entities;
  const attackNumber = entityInfo[stage].attack.number;
  const attackArray = Array.from({ length: attackNumber }, (_, i) => i);

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
}
