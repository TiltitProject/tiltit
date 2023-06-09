import React, { useState, useEffect } from "react";
import Matter from "matter-js";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {
  selectCollideMonster,
  selectIsPlayerMove,
} from "../features/gameSlice";
import MovingPlayer from "./MovingPlayer";
import CollidePlayer from "./CollidePlayer";
import { walking } from "../../assets/audio";
import playAudio from "../utils/playAudio";

export default function MakePlayer(world, color, position, size, stage) {
  const initialPlayer = Matter.Bodies.circle(position.x, position.y, size / 2, {
    label: "Player",
    stage,
    lastPosition: position,
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
  const isPlayerMove = useSelector(selectIsPlayerMove);
  const [lastPosition, setLastPosition] = useState(
    JSON.parse(JSON.stringify(position)),
  );
  const [runningImageIndex, setRunningImageIndex] = useState(0);
  const distance = Matter.Vector.magnitude(
    Matter.Vector.sub(position, lastPosition),
  );

  useEffect(() => {
    if (distance > 9) {
      if (runningImageIndex === 5 || runningImageIndex === 11) {
        if (isPlayerMove) {
          playAudio(walking);
        }
      }
      if (runningImageIndex < 11) {
        setLastPosition(JSON.parse(JSON.stringify(position)));
        setRunningImageIndex(runningImageIndex + 1);
      } else {
        setLastPosition(JSON.parse(JSON.stringify(position)));
        setRunningImageIndex(0);
      }
    }
  }, [distance]);

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
          lastPosition={lastPosition}
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
    zIndex: 1,
  });
}
