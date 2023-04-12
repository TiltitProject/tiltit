import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { transition } from "../../../assets/static";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function FadeInRow({ startY, width }) {
  const animatedTransition = useRef(new Animated.Value(0)).current;
  const destinationY = windowHeight * 2;

  Animated.timing(animatedTransition, {
    toValue: 5,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  const interpolateY = animatedTransition.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [
      destinationY / 6,
      (destinationY / 6) * 2,
      (destinationY / 6) * 3,
      (destinationY / 6) * 4,
      (destinationY / 6) * 5,
      destinationY,
    ],
  });

  const interpolateSize = animatedTransition.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [450, 200, 140, 50, 20, 1],
  });

  return (
    <>
      <Animated.Image
        style={[
          leftBoxStyle(startY, width),
          {
            transform: [
              { translateY: interpolateY },
              { scale: interpolateSize },
            ],
          },
        ]}
        source={transition}
        contentFit="stretch"
      />
      <Animated.Image
        style={[
          centerBoxStyle(startY, width),
          {
            transform: [
              { translateY: interpolateY },
              { scale: interpolateSize },
            ],
          },
        ]}
        source={transition}
        contentFit="stretch"
      />
      <Animated.Image
        style={[
          rightBoxStyle(startY, width),
          {
            transform: [
              { translateY: interpolateY },
              { scale: interpolateSize },
            ],
          },
        ]}
        source={transition}
        contentFit="stretch"
      />
    </>
  );
}

function leftBoxStyle(startY, width) {
  return StyleSheet.create({
    position: "absolute",
    width,
    height: width,
    left: (windowWidth / 10) * 2 - 10,
    top: startY,
    zIndex: 999,
  });
}

function centerBoxStyle(startY, width) {
  return StyleSheet.create({
    position: "absolute",
    width,
    height: width,
    left: (windowWidth / 10) * 5 - 10,
    top: startY,
    zIndex: 999,
  });
}

function rightBoxStyle(startY, width) {
  return StyleSheet.create({
    position: "absolute",
    width,
    height: width,
    left: (windowWidth / 10) * 8 - 10,
    top: startY,
    zIndex: 999,
  });
}
