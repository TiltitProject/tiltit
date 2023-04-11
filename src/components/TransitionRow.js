import React, { useRef, useEffect } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { transition } from "../../assets/static";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function TransitionRow({destinationY, startTime}) {
  const animatedTransition = useRef(new Animated.Value(0)).current;

  useEffect(()=> {
    setTimeout(() => {
      Animated.timing(animatedTransition, {
        toValue: 5,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, startTime);
  }, []);


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
    outputRange: [1, 7, 14, 21, 28, 35],
  });

  return (
    <>
      <Animated.Image
        style={[
          transitionRow.left,
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
          transitionRow.center,
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
          transitionRow.right,
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

const transitionRow = StyleSheet.create({
  left: {
    position: "absolute",
    width: 10,
    height: 10,
    left: (windowWidth / 10) * 2 - 10,
    top: -10,
    zIndex: 999,
  },
  center: {
    position: "absolute",
    width: 10,
    height: 10,
    left: (windowWidth / 10) * 5 - 10,
    top: -10,
    zIndex: 999,
  },
  right: {
    position: "absolute",
    width: 10,
    height: 10,
    left: (windowWidth / 10) * 8 - 10,
    top: -10,
    zIndex: 999,
  },
});
