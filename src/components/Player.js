import React, { useState } from "react";
import Matter from "matter-js";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectCollideMonster } from "../features/gameSlice";
import MovingPlayer from "./MovingPlayer";
import CollidePlayer from "./CollidePlayer";

export default function MakePlayer(world, color, position, size) {
  const initialPlayer = Matter.Bodies.circle(position.x, position.y, size / 2, {
    label: "Player",
    collide: false,
  });

  Matter.World.add(world, initialPlayer);

  return {
    body: initialPlayer,
    color,
    position,
    renderer: <Player />,
  };
}

function Player(props) {
  const { body } = props;
  const { position, circleRadius } = body;
  const widthBody = circleRadius * 2;
  const widthImage = widthBody * 1.5;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - widthBody / 2;
  const xImage = -widthBody * 0.3;
  const yImage = -widthBody * 0.35;
  const isCollide = useSelector(selectCollideMonster);
  const [lastPosition, setLastPosition] = useState(
    JSON.parse(JSON.stringify(position)),
  );
  const [runningImageIndex, setRunningImageIndex] = useState(0);
  const distance = Matter.Vector.magnitude(
    Matter.Vector.sub(position, lastPosition),
  );

  if (distance > 10) {
    if (runningImageIndex < 11) {
      setLastPosition(JSON.parse(JSON.stringify(position)));
      setRunningImageIndex(runningImageIndex + 1);
    } else {
      setLastPosition(JSON.parse(JSON.stringify(position)));
      setRunningImageIndex(0);
    }
  }

  return (
    <View style={makeViewStyle(xBody, yBody, widthBody)}>
      {!isCollide ? (
        <MovingPlayer
          xImage={xImage}
          yImage={yImage}
          widthImage={widthImage}
          runningImageIndex={runningImageIndex}
        />
      ) : (
        <CollidePlayer
          xImage={xImage}
          yImage={yImage}
          widthImage={widthImage}
        />
      )}
    </View>
  );
}

function makeViewStyle(xBody, yBody, widthBody) {
  return StyleSheet.create({
    position: "absolute",
    width: widthBody,
    height: widthBody,
    left: xBody,
    top: yBody,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  });
}
