import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export default function CollideMonster({
  heightBody,
  widthBody,
  image,
  flyingVector,
}) {
  const deathAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(deathAnimation, {
      toValue: 4,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const interpolateX = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [
      flyingVector.x * 5,
      flyingVector.x * 10,
      flyingVector.x * 15,
      flyingVector.x * 20,
      flyingVector.x * 25,
    ],
  });

  const interpolateY = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [
      flyingVector.y * 5,
      flyingVector.y * 10,
      flyingVector.y * 15,
      flyingVector.y * 20,
      flyingVector.y * 25,
    ],
  });

  const rotateInterpolation = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ["0deg", "180deg", "360deg", "540deg", "720deg"],
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
