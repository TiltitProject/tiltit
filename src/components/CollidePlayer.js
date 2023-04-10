import React, { useState, useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import Dynamic from "../../assets/dynamicImage";
import { showCrackEffect } from "../features/gameSlice";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function CollidePlayer({ xImage, yImage, widthImage }) {
  const deathAnimation = useRef(new Animated.Value(0)).current;
  const [collideImageIndex, setCollideImageIndex] = useState(0);
  const xCenter = xImage - widthImage / 2;
  const yCenter = yImage - widthImage / 2;
  const dispatch = useDispatch();

  useEffect(() => {
    const changeIndex = setTimeout(() => {
      if (collideImageIndex < 7) {
        return setCollideImageIndex(collideImageIndex + 1);
      }
      setTimeout(() => dispatch(showCrackEffect()), 300);
    }, 100);

    return () => {
      clearInterval(changeIndex);
    };
  }, [collideImageIndex]);

  Animated.timing(deathAnimation, {
    toValue: 5,
    duration: 500,
    useNativeDriver: true,
  }).start();

  const interpolateX = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [
      (windowWidth - xCenter) / 5,
      (windowWidth - xCenter) / 3.5,
      (windowWidth - xCenter) / 2,
      windowWidth - xCenter,
      windowWidth / 2 - xCenter,
      windowWidth / 4 - xCenter - widthImage,
    ],
  });

  const interpolateY = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [
      (windowHeight / 2 - yCenter) / 8,
      (windowHeight / 2 - yCenter) / 7,
      (windowHeight / 2 - yCenter) / 6,
      (windowHeight / 2 - yCenter) / 5,
      (windowHeight / 2 - yCenter) / 4,
      (windowHeight / 2 - yCenter) / 2,
    ],
  });

  const interpolateSize = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [1, 1.2, 1.4, 1.6, 3, 5],
  });

  const rotateInterpolation = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: ["180deg", "360deg", "540deg", "720deg", "1000deg", "1500deg"],
  });

  return (
    <Animated.Image
      style={[
        makeCollisionStyle(xImage, yImage, widthImage),
        {
          transform: [
            { translateX: interpolateX },
            { translateY: interpolateY },
            { rotate: rotateInterpolation },
            { scale: interpolateSize },
          ],
        },
      ]}
      source={Dynamic.hitVirtualGuy[collideImageIndex]}
      contentFit="stretch"
    />
  );
}

function makeCollisionStyle(xImage, yImage, widthImage) {
  return StyleSheet.create({
    width: widthImage,
    height: widthImage,
    left: xImage,
    top: yImage,
    borderWidth: 1,
    borderColor: "black",
  });
}
