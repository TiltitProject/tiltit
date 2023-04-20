import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {
  selectItemsVisible,
  selectMapState,
  selectStage,
  selectCurrentStage,
} from "../features/gameSlice";

export default function Item({ size, image, num }) {
  const currentStage = useSelector(selectCurrentStage);
  const { position } = useSelector(selectMapState)[currentStage].item[num];

  const widthBody = size.width;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - widthBody / 2;
  const widthImage = widthBody * 2;
  const xImage = -widthBody * 0.5;
  const yImage = -widthBody * 0.5;
  const isVisible = useSelector(selectItemsVisible)[num];

  if (isVisible) {
    return (
      <View style={viewStyle(xBody, yBody, widthBody)}>
        <Image style={imageStyle(xImage, yImage, widthImage)} source={image} />
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
