import React from "react";
import { Image } from "expo-image";
import Matter from "matter-js";
import { View, StyleSheet } from "react-native";
import { characterVirtualIdle } from "../assets/static";

export default function MakePlayer(world, color, position, size) {
  const initialPlayer = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
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
  const { bounds, position } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
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
