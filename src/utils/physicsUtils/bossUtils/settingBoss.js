import entityInfo from "../../../entities/entitiesInfo";

export default function settingBoss ({ entities, Matter, bossRound }) {
  if (entities.round === bossRound) {
    const { stage } = entities;
    const { world } = entities.physics;
    const player = entities.player.body;
    const blockNumber = entityInfo[stage].block.renderEntity;
    const blockArray = Array.from({ length: blockNumber }, (_, i) => i);

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
};


