import React, { useState, useEffect } from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRunningGame,
  selectCurrentRound,
  selectIsPlayerMove,
  selectBossHP,
  applyStageResult
} from "../features/gameSlice";

export default function MakeBoss(world, position, size, specifics) {
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { isStatic: true, specifics, initialPosition: position },
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    position,
    renderer: <Boss />,
  };
}

function Boss(props) {
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const [deathImageIndex, setDeathImageIndex] = useState(0);
  const { body } = props;
  const { bounds, position, specifics } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;
  const isGameRun = useSelector(selectRunningGame);
  const currentRound = useSelector(selectCurrentRound);
  const isPlayerMove = useSelector(selectIsPlayerMove);
  const FULL_PH = 20;
  const bossHP = useSelector(selectBossHP);
  const HPbarHeight = heightBody / 10;

  useEffect(() => {
    if (isPlayerMove && currentRound === specifics.round && bossHP) {
      const changeIndex = setTimeout(() => {
        if (isGameRun && imageIndex < specifics.idleImage.length - 1) {
          return setImageIndex(imageIndex + 1);
        }
        setImageIndex(0);
      }, 100);

      return () => {
        clearInterval(changeIndex);
      };
    }

    if (!bossHP) {
      const changeIndex = setTimeout(() => {
        if (isGameRun && deathImageIndex < specifics.deathImage.length - 1) {
          return setDeathImageIndex(deathImageIndex + 1);
        }
        dispatch(applyStageResult());
      }, 50);

      return () => {
        clearInterval(changeIndex);
      };
    }
  }, [imageIndex, currentRound, bossHP, deathImageIndex]);

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      {bossHP ? (
        <Image
          style={imageStyle(heightBody, widthBody)}
          source={specifics.idleImage[imageIndex]}
        />
      ) : (
        <Image
          style={imageStyle(heightBody, widthBody)}
          source={specifics.deathImage[deathImageIndex]}
        />
      )}
      <View style={HPbarStyle(HPbarHeight, widthBody)}>
        <View style={restHP(HPbarHeight, (widthBody / FULL_PH) * bossHP)} />
      </View>
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

function HPbarStyle(HPbarHeight, widthBody) {
  return StyleSheet.create({
    height: HPbarHeight,
    width: widthBody,
    borderWidth: 1,
  });
}

function restHP(HPbarHeight, widthBody) {
  return StyleSheet.create({
    height: HPbarHeight,
    width: widthBody,
    left: 0,
    backgroundColor: "red",
  });
}
