import React, { useEffect, useState, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export default function CollideMonster({
  heightBody,
  widthBody,
  image,
  flyingVector,
}) {
  const deathAnimation = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    Animated.timing(deathAnimation, {
      toValue: 4,
      duration: 400,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }, []);

  const interpolateX = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [
      flyingVector.x * 7,
      flyingVector.x * 14,
      flyingVector.x * 28,
      flyingVector.x * 56,
      flyingVector.x * 102,
    ],
  });

  const interpolateY = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [
      flyingVector.y * 7,
      flyingVector.y * 14,
      flyingVector.y * 28,
      flyingVector.y * 56,
      flyingVector.y * 102,
    ],
  });

  const rotateInterpolation = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ["0deg", "180deg", "360deg", "540deg", "720deg"],
  });

  if (visible) {
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
}

function imageStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
  });
}
