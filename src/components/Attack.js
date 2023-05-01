import React from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";

export default function AttackMaker(world, position, size, specifics, number) {
  const initialObstacle = Matter.Bodies.circle(
    position.x,
    position.y,
    size.width / 2,
    { number, specifics },
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    position,
    renderer: <Attack />,
  };
}

function Attack(props) {
  const { body } = props;
  const { position, specifics, circleRadius } = body;
  const widthBody = circleRadius * 2;
  const widthImage = widthBody * 2.5;
  const xImage = -widthBody * 0.75;
  const yImage = -widthBody * 0.65;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - widthBody / 2;

  return (
    <View style={viewStyle(xBody, yBody, widthBody)}>
      <Image
        style={imageStyle(xImage, yImage, widthImage)}
        source={specifics.image}
      />
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
  });
}
