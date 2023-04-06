// import { Image } from "expo-image";
import React from "react";
import Matter from "matter-js";
import { View, Image } from "react-native";
import { grayBrickRow } from "../assets/static";

function Obstacle1(props) {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2; //중심
  const yBody = props.body.position.y - heightBody / 2;
  const color = props.color;

  return (
    <View
      style={{
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        borderWidth: 1,
        borderColor: color,
        borderStyle: "solid",
      }}
    >
      <Image
        style={{
          height: heightBody,
          width: widthBody,
          resizeMode: "repeat",
        }}
        source={grayBrickRow}
      />
    </View>
  );
}

export default function MakeObstacle(world, label, color, position, size) {
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
    renderer: <Obstacle1 />,
  };
}
