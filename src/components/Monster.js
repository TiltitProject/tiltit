import React, { useState, useEffect } from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";
import Dynamic from "../../assets/dynamicImage";

export default function MakeMonster(world, label, color, position, size) {
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { label, isStatic: true },
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    position,
    renderer: <Monster />,
  };
}

function Monster(props) {
  const [imageIndex, setImageIndex] = useState(0);
  const { body } = props;
  const { bounds, position } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;

  useEffect(() => {
    const changeIndex = setTimeout(() => {
      if (imageIndex < 14) {
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
        style={floorStyle(heightBody, widthBody)}
        source={Dynamic.rock[imageIndex]}
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

function floorStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
  });
}
