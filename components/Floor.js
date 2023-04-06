import React from "react";
import Matter from "matter-js";
import { View,Image } from "react-native";

function Floor1(props) {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2; //중심
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        backgroundColor: color,
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
          resizeMode: "repeat",
        }}
        source={require("../assets/bricks/red_rectangle.png")}
      />
    </View>
  );
}

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
    renderer: <Floor1 />,
  };
}
