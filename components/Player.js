import React from "react";
import { Image } from "expo-image";
import Matter from "matter-js";
import { View, StyleSheet } from "react-native";
import { characterVirtualIdle } from "../assets/static";

export default function MakePlayer(world, color, position, size) {
  const initialPlayer = Matter.Bodies.circle(
    position.x,
    position.y,
    size.width / 2,
    { label: "Player" },
  );

  Matter.World.add(world, initialPlayer);

  return {
    body: initialPlayer,
    color,
    position,
    renderer: <Player />,
  };
}

function Player(props) {
  const { body } = props;
  const { position, circleRadius } = body;
  const widthBody = circleRadius * 2;
  const heightBody = circleRadius * 2;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;

  return (
    <View style={makeViewStyle(xBody, yBody, widthBody, heightBody)}>
      <Image
        style={makeCharacterStyle(heightBody, widthBody)}
        source={characterVirtualIdle}
        contentFit="cover"
      />
    </View>
  );
}
function makeViewStyle(xBody, yBody, widthBody, heightBody) {
  return StyleSheet.create({
    position: "absolute",
    left: xBody,
    top: yBody,
    width: widthBody,
    height: heightBody,
  });
}

function makeCharacterStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
  });
}
