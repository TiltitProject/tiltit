import React from "react";
import { Image } from "expo-image";
import Matter from "matter-js";
import { View } from "react-native";
import { characterVirtualIdle } from "../assets/static";

function Player1(props) {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
      <Image
        style={{
          height: heightBody,
          width: widthBody,
        }}
        source={characterVirtualIdle}
      />
    </View>
  );
}

export default function MakePlayer(world, color, position, size) {
  const initialPlayer = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { label: "Bird" },
  );

  Matter.World.add(world, initialPlayer);

  return {
    body: initialPlayer,
    color,
    position,
    renderer: <Player1 />,
  };
}
