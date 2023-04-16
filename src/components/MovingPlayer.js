import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import Dynamic from "../../assets/dynamicImage";

export default function MovingPlayer({
  xImage,
  yImage,
  widthImage,
  runningImageIndex,
}) {
  return (
    <View>
      <Image
        style={makeCharacterStyle(xImage, yImage, widthImage)}
        source={Dynamic.runningVirtualGuy[runningImageIndex]}
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
