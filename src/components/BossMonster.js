import React, { useState, useEffect } from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {
  selectRunningGame,
  selectAliveMonsters,
  selectMonsterFlyingVector,
  selectCurrentRound,
  selectIsPlayerMove,
} from "../features/gameSlice";
import CollideMonster from "./CollideMonster";

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

function Monster(props) {
  const [imageIndex, setImageIndex] = useState(0);
  const { body } = props;
  const { bounds, position, specifics, label } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;
  const isGameRun = useSelector(selectRunningGame);
  const isAlive = useSelector(selectAliveMonsters)[label];
  const flyingVector = useSelector(selectMonsterFlyingVector);
  const currentRound = useSelector(selectCurrentRound);
  const isPlayerMove = useSelector(selectIsPlayerMove);

  useEffect(() => {
    if (isPlayerMove && currentRound === specifics.round) {
      const changeIndex = setTimeout(() => {
        if (isGameRun && imageIndex < specifics.image.length - 1) {
          return setImageIndex(imageIndex + 1);
        }
        setImageIndex(0);
      }, 100);

      return () => {
        clearInterval(changeIndex);
      };
    }
  }, [imageIndex, currentRound]);

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      {isAlive ? (
        <Image
          style={imageStyle(heightBody, widthBody)}
          source={specifics.image[imageIndex]}
        />
      ) : (
        <CollideMonster
          heightBody={heightBody}
          widthBody={widthBody}
          image={specifics.image[0]}
          flyingVector={flyingVector}
        />
      )}
    </View>
  );
}

function viewStyle(xBody, yBody, widthBody, heightBody) {
  return StyleSheet.create({
    position: "absolute",
    left: xBody,
    top: yBody,
    width: widthBody,
    height: heightBody,
  });
}

function imageStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
  });
}
