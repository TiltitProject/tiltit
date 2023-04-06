import React from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";
import { redRectangle } from "../assets/static";

export default function FloorMaker(world, color, position, size) {
  const initialFloor = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {
      label: "Floor",
      isStatic: true,
    },
  );

  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    color,
    position,
    renderer: <Floor />,
  };
}

function Floor(props) {
  const { body, color } = props;
  const { bounds, position } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;

  return (
    <View style={viewStyle(color, xBody, yBody, widthBody, heightBody)}>
      <Image style={floorStyle(heightBody, widthBody)} source={redRectangle} />
    </View>
  );
}

function viewStyle(color, xBody, yBody, widthBody, heightBody) {
  return StyleSheet.create({
    backgroundColor: color,
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
    resizeMode: "repeat",
  });
}
