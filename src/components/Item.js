import React, { useState, useEffect } from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";

import { selectItemsVisible } from "../features/gameSlice";

export default function ItemMaker(world, position, size, specifics, number) {
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { isStatic: true, number, specifics },
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
  const { bounds, position, render, specifics } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const widthImage = widthBody * 2.5;
  const xImage = -widthBody * 0.75;
  const yImage = -widthBody * 0.65;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - widthBody / 2;

  if (render.visible) {
    return (
      <View style={viewStyle(xBody, yBody, widthBody)}>
        {render.visible && (
          <Image
            style={imageStyle(xImage, yImage, widthImage)}
            source={specifics.image}
          />
        )}
      </View>
    );
  }
}

function viewStyle(xBody, yBody, widthBody) {
  return StyleSheet.create({
    position: "absolute",
    left: xBody,
    top: yBody,
    width: widthBody,
    height: widthBody,
    borderWidth: 1,
  });
}

function imageStyle(xImage, yImage, widthImage) {
  return StyleSheet.create({
    width: widthImage,
    height: widthImage,
    left: xImage,
    top: yImage,
  });
}
