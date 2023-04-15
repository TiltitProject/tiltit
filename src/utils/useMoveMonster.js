import { useEffect, useState } from "react";

const useMoveRow = (body, initialPosition, Matter, specifics) => {
  const [moveRight, setMoveRight] = useState(true);
  const makeMoveAxis = (direction) => {
    if (direction === "row") {
      return { move: "x", stop: "y" };
    }
    return { move: "y", stop: "x" };
  };

  const axis = makeMoveAxis(specifics.direction);

  useEffect(() => {
    if (
      body.position[axis.move] >=
      initialPosition[axis.move] + specifics.distance
    ) {
      setMoveRight(false);
    } else if (
      body.position[axis.move] <=
      initialPosition[axis.move] - specifics.distance
    ) {
      setMoveRight(true);
    }
  }, [moveRight, body.position[axis.move]]);

  if (moveRight) {
    Matter.Body.translate(body, {
      [axis.move]: specifics.speed,
      [axis.stop]: 0,
    });
  } else {
    Matter.Body.translate(body, {
      [axis.move]: -specifics.speed,
      [axis.stop]: 0,
    });
  }
};

export default useMoveRow;
