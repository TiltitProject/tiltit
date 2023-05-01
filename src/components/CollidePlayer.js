import React, { useState, useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import Dynamic from "../../assets/dynamicImage";
import { showCrackEffect, showModal } from "../features/gameSlice";
import { playSound } from "../utils/playSound";
import { falling, hit, breakScreen } from "../../assets/audio";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function CollidePlayer({
  xImage,
  yImage,
  lastPosition,
  widthImage,
}) {
  const deathAnimation = useRef(new Animated.Value(0)).current;
  const [collideImageIndex, setCollideImageIndex] = useState(0);
  const xCenter = lastPosition.x - widthImage / 2;
  const yCenter = lastPosition.y - widthImage / 2;
  const dispatch = useDispatch();
  const [breakEffect, setBreakEffect] = useState(null);
  const [hitEffect, setHitEffect] = useState(null);
  const [fallEffect, setFallEffect] = useState(null);

  useEffect(
    () => () => {
      if (breakEffect) {
        breakEffect.unloadAsync();
      }
      if (hitEffect) {
        hitEffect.unloadAsync();
      }
      if (fallEffect) {
        fallEffect.unloadAsync();
      }
    },
    [],
  );

  useEffect(() => {
    const changeIndex = setTimeout(() => {
      if (collideImageIndex < 7) {
        return setCollideImageIndex(collideImageIndex + 1);
      }
      setTimeout(() => {
        playSound(breakEffect, setBreakEffect, breakScreen, 0.7);
      }, 100);

      setTimeout(() => {
        dispatch(showCrackEffect());
      }, 300);

      setTimeout(() => {
        dispatch(showModal());
      }, 600);
    }, 100);

    if (collideImageIndex === 0) {
      playSound(hitEffect, setHitEffect, hit, 1);
    }
    if (collideImageIndex === 2) {
      playSound(fallEffect, setFallEffect, falling, 0.7);
    }

    return () => {
      clearInterval(changeIndex);
    };
  }, [collideImageIndex]);

  useEffect(() => {
    Animated.timing(deathAnimation, {
      toValue: 5,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const xVertex = windowWidth - xCenter - widthImage / 2;
  const xDestination = windowWidth / 2 - xCenter - widthImage / 2;

  const interpolateX = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [
      (xVertex / 3) * 0.5,
      (xVertex / 3) * 1,
      (xVertex / 3) * 2,
      xVertex,
      xDestination / 2,
      xDestination / 2,
    ],
  });

  const yVertex = (windowHeight / 2 - yCenter) / 2;
  const yDestination = windowHeight / 2 - yCenter;

  const interpolateY = deathAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [
      (yVertex / 3) * 0.5,
      (yVertex / 3) * 1,
      (yVertex / 3) * 2,
      yVertex,
      yDestination / 2,
      yDestination,
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
  });
}
