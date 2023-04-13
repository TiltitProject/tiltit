import React from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";
import { goal } from "../../assets/static";
import Dynamic from "../../assets/dynamicImage";

export default function ItemMaker(world, position, size, itemType) {
  const initialItem = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {
      label: "Item",
      isStatic: true,
      itemType,
    },
  );

  Matter.World.add(world, initialItem);

  return {
    body: initialItem,
    position,
    renderer: <Item />,
  };
}

function Item(props) {
  const { body } = props;
  const { bounds, position, itemType } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      {itemType === "goal" && (
        <Image style={makeStyle(heightBody, widthBody)} source={goal} />
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

function makeStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
  });
}
