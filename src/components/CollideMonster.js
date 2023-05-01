import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import playAudio from "../utils/playAudio";
import { falling } from "../../assets/audio";

export default function CollideMonster({
  heightBody,
  widthBody,
  image,
  flyingVector,
}) {
  const deathAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(deathAnimation, {
      toValue: 6,
      duration: 500,
      useNativeDriver: true,
    }).start();
    playAudio(falling);
  }, []);

  const interpolateX = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6],
    outputRange: [
      flyingVector.x * 5,
      flyingVector.x * 10,
      flyingVector.x * 15,
      flyingVector.x * 20,
      flyingVector.x * 25,
      flyingVector.x * 30,
      flyingVector.x * 35,
    ],
  });

  const interpolateY = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6],
    outputRange: [
      flyingVector.y * 5,
      flyingVector.y * 10,
      flyingVector.y * 15,
      flyingVector.y * 20,
      flyingVector.y * 25,
      flyingVector.y * 30,
      flyingVector.y * 35,
    ],
  });

  const rotateInterpolation = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6],
    outputRange: [
      "0deg",
      "180deg",
      "360deg",
      "540deg",
      "720deg",
      "900deg",
      "1080deg",
    ],
  });

  return (
    <Animated.Image
      style={[
        imageStyle(heightBody, widthBody),
        {
          transform: [
            { translateX: interpolateX },
            { translateY: interpolateY },
            { rotate: rotateInterpolation },
          ],
        },
      ]}
      source={image}
    />
  );
}

function imageStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
  });
}
