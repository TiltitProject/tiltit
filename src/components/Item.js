import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectItemsVisible } from "../features/gameSlice";
// export default function makeItem(world, position, size, image) {
//   const initialObstacle = Matter.Bodies.rectangle(
//     position.x,
//     position.y,
//     size.width,
//     size.height,
//     { isStatic: true, image, },
//   );

//   Matter.World.add(world, initialObstacle);

//   return {
//     body: initialObstacle,
//     position,
//     renderer: <Item />,
//   };
// }

export default function Item({ position, size, image, num }) {
  const widthBody = size.width;
  const heightBody = size.height;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;
  const isVisible = useSelector(selectItemsVisible)[num];

  if (isVisible) {
    return (
      <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
        <Image style={imageStyle(heightBody, widthBody)} source={image} />
      </View>
    );
  }
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
    resizeMode: "cover",
  });
}
