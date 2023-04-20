import React from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";
import {
  block,
  blockColumnThree,
  blockRowThree,
  goldTwice,
  ironColumnThree,
  ironRowThree,
  gold,
  ground,
} from "../../assets/static";

export default function BlockMaker(world, position, size, image) {
  const initialFloor = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {
      label: "Floor",
      isStatic: true,
      image,
    },
  );

  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    position,
    renderer: <Block />,
  };
}

function Block(props) {
  const { body } = props;
  const { bounds, position, image } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;



  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      <Image style={floorStyle(heightBody, widthBody)} source={image} />
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
    resizeMode: "repeat",
    borderWidth: 1,
  });
}
