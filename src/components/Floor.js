import React from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";
import { ironRowThree, ironColumnThree } from "../../assets/static";

export default function FloorMaker(world, position, size, type) {
  const initialFloor = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {
      label: "Floor",
      isStatic: true,
      type,
    },
  );

  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    position,
    renderer: <Floor />,
  };
}

function Floor(props) {
  const { body } = props;
  const { bounds, position, type } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      {type === "row" && (
        <Image
          style={floorStyle(heightBody, widthBody)}
          source={ironRowThree}
        />
      )}
      {type === "column" && (
        <Image
          style={floorStyle(heightBody, widthBody)}
          source={ironColumnThree}
        />
      )}
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
  });
}
