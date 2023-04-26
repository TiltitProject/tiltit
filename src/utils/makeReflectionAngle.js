export default function makeReflectionAngle(collision, player) {
  const direction = {
    x: Math.cos(player.angle),
    y: Math.sin(player.angle),
  };

  const reflection = {
    x:
      direction.x -
      2 * (direction.x * collision.normal.x + direction.y) * collision.normal.x,
    y:
      direction.y -
      2 * (direction.x * collision.normal.x + direction.y) * collision.normal.y,
  };

  const reflectionAngle = Math.atan2(reflection.y, reflection.x);

  return reflectionAngle;
}
