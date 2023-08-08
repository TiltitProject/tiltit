import React from "react";
import Matter from "matter-js";
import Monster from "./Monster";

export default function MakeMonster(
  world,
  position,
  size,
  specifics,
  objectNum
) {
  const initialObstacle = Matter.Bodies.circle(
    position.x,
    position.y,
    size.width / 2,
    { isStatic: true, specifics, initialPosition: position, label: objectNum }
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    position,
    renderer: <Monster />,
  };
}
