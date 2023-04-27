import React, { useState, useEffect } from "react";
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
import useChangeIndex from "../utils/changeIndex";

export default function Monster(props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [visibleFlying, setVisibleFlying] = useState(true);
  const { body } = props;
  const { bounds, position, specifics, label } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;
  const isAlive = useSelector(selectAliveMonsters)[label];
  const isGameRun = useSelector(selectRunningGame);
  const flyingVector = useSelector(selectMonsterFlyingVector);
  const currentRound = useSelector(selectCurrentRound);
  const isPlayerMove = useSelector(selectIsPlayerMove);

  useChangeIndex(
    isPlayerMove,
    currentRound,
    specifics,
    isGameRun,
    imageIndex,
    setImageIndex,
  );

  useEffect(() => {
    if (!isAlive && visibleFlying) {
      const setInvisibleFlying = setTimeout(
        () => setVisibleFlying(false),
        1200,
      );

      return () => {
        clearInterval(setInvisibleFlying);
      };
    }
  }, [visibleFlying, isAlive]);

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      {isAlive && (
        <Image
          style={imageStyle(heightBody, widthBody)}
          source={specifics.image[imageIndex]}
        />
      )}
      {!isAlive && visibleFlying && (
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
