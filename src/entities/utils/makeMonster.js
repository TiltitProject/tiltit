import React from "react";
import Matter from "matter-js";
import Monster from "../../components/Monster";

export default function MakeMonster(
  world,
  position,
  size,
  specifics,
  objectNum,
) {
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { isStatic: true, specifics, initialPosition: position, label: objectNum },
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    position,
    renderer: <Monster />,
  };
}
