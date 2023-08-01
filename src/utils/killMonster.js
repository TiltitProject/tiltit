import entityInfo from "../entities/entitiesInfo";
import makeReflectionAngle from "./physicsUtils/makeReflectionAngle";

export default function killMonster({
  Matter,
  entities,
  num,
  dispatch,
  collision,
}) {
  const player = entities.player.body;
  const monsterEntity = entities[`monster${num + 1}`].body;
  const { world } = entities.physics;
  const { stage } = entities;

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
}
