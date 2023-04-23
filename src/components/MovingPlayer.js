import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Dynamic from "../../assets/dynamicImage";
import { selectIsSpecialMode } from "../features/gameSlice";

export default function MovingPlayer({
  xImage,
  yImage,
  widthImage,
  runningImageIndex,
}) {
  const isSpecialMode = useSelector(selectIsSpecialMode);

  return (
    <View>
      <Image
        style={makeCharacterStyle(xImage, yImage, widthImage)}
        source={
          !isSpecialMode
            ? Dynamic.runningVirtualGuy[runningImageIndex]
            : Dynamic.specialVirtualGuy[runningImageIndex]
        }
        contentFit="stretch"
      />
    </View>
  );
}

function makeCharacterStyle(xImage, yImage, widthImage) {
  return StyleSheet.create({
    width: widthImage,
    height: widthImage,
    left: xImage,
    top: yImage,
  });
}
