import React, { useState, useEffect } from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectRunningGame } from "../features/gameSlice";

export default function MakeMonster(world, position, size, specifics) {
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
    renderer: <Monster />,
  };
}

function Monster(props) {
  const [imageIndex, setImageIndex] = useState(0);
  const { body } = props;
  const { bounds, position, specifics, initialPosition } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;
  const isGameRun = useSelector(selectRunningGame);

  useEffect(() => {
    const changeIndex = setTimeout(() => {
      if (isGameRun && imageIndex < specifics.image.length - 1) {
        return setImageIndex(imageIndex + 1);
      }
      setImageIndex(0);

      return () => {
        clearInterval(changeIndex);
      };
    }, 100);
  }, [imageIndex]);

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      <Image
        style={imageStyle(heightBody, widthBody)}
        source={specifics.image[imageIndex]}
      />
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
