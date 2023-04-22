import React from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";

export default function FlagMaker(world, position, size, image, number) {
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { isStatic: true, number, image },
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    position,
    renderer: <Flag />,
  };
}

function Flag(props) {
  const { body } = props;
  const { bounds, position, image } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const widthImage = widthBody * 2;
  const xImage = -widthBody * 0.5;
  const yImage = -widthBody * 0.5;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - widthBody / 2;

  return (
    <View style={viewStyle(xBody, yBody, widthBody)}>
      <Image style={imageStyle(xImage, yImage, widthImage)} source={image} />
    </View>
  );
}

function viewStyle(xBody, yBody, widthBody) {
  return StyleSheet.create({
    position: "absolute",
    left: xBody,
    top: yBody,
    width: widthBody,
    height: widthBody,
  });
}

function imageStyle(xImage, yImage, widthImage) {
  return StyleSheet.create({
    width: widthImage,
    height: widthImage,
    left: xImage,
    top: yImage,
    resizeMode: "cover",
  });
}
