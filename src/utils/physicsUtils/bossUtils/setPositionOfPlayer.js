export default function setPositionOfPlayer({ Matter, entities, entity }) {
  const player = entities.player.body;

  Matter.Body.setPosition(entities[entity].body, {
    x: player.position.x,
    y: player.position.y - player.circleRadius,
  });
}
