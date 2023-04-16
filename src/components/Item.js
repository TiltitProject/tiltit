import React, { useEffect,useRef, useState } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Matter from "matter-js";
import { apple } from "../../assets/static";
import { selectHasClear } from "../features/gameSlice";

export default function makeItem(world, position, size, image) {
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { isStatic: true, image, },
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    position,
    renderer: <Item />,
  };
}

function Item(props) {
  const { body } = props;
  const { bounds, position, image } = body;

  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      <Animated.Image
        style={imageStyle(heightBody, widthBody)}
        source={image}
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
