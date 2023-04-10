import React, { useState, useRef } from "react";
import { Image } from "expo-image";
import Matter from "matter-js";
import { View, Animated, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Dynamic from "../../assets/dynamicImage";
import { selectCollideMonster } from "../features/gameSlice";

function MovingPlayer(props) {
  const { body } = props;
  const { position, circleRadius, collide } = body;
  const widthBody = circleRadius * 2;
  const widthImage = widthBody * 1.5;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - widthBody / 2;
  const xImage = -widthBody * 0.3;
  const yImage = -widthBody * 0.35;
  const isCollide = useSelector(selectCollideMonster);
  const deathAnimation = useRef(new Animated.Value(0)).current;
  const [lastPosition, setLastPosition] = useState(
    JSON.parse(JSON.stringify(position)),
  );
  const [runningImageIndex, setRunningImageIndex] = useState(0);
  const distance = Matter.Vector.magnitude(
    Matter.Vector.sub(position, lastPosition),
  );
  const pan = useRef(new Animated.ValueXY()).current;

  if (distance > 10) {
    if (runningImageIndex < 11) {
      setLastPosition(JSON.parse(JSON.stringify(position)));
      setRunningImageIndex(runningImageIndex + 1);
    } else {
      setLastPosition(JSON.parse(JSON.stringify(position)));
      setRunningImageIndex(0);
    }
  }

  if (isCollide) {
    Animated.timing(deathAnimation, {
      toValue: 6,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const interpolateX = deathAnimation.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6],
      outputRange: [10, 5, 10, 15, 20, 25, 30],
      extrapolate: "clamp",
    });

    const interpolateY = deathAnimation.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6],
      outputRange: [10, 5, 0, 5, 0, 5, 0],
      extrapolate: "clamp",
    });

    const interpolateImage = deathAnimation.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6],
      outputRange: [
        Dynamic.hitVirtualGuy[0],
        Dynamic.hitVirtualGuy[1],
        Dynamic.hitVirtualGuy[2],
        Dynamic.hitVirtualGuy[3],
        Dynamic.hitVirtualGuy[4],
        Dynamic.hitVirtualGuy[5],
        Dynamic.hitVirtualGuy[6],
      ],
      extrapolate: "clamp",
    });

    return (
      <View style={makeViewStyle(xBody, yBody, widthBody)}>
        <Animated.Image
          style={[
            makeCollisionStyle(xImage, yImage, widthImage),
            {
              transform: [
                { translateX: interpolateX },
                { translateY: interpolateY },
              ],
            },
          ]}
          source={Dynamic.hitVirtualGuy[collideImageIndex]}
          contentFit="stretch"
        />
      </View>
    );
  }

  return (
    <View style={makeViewStyle(xBody, yBody, widthBody)}>
      {isCollide}
      <Image
        style={makeCharacterStyle(xImage, yImage, widthImage)}
        source={Dynamic.runningVirtualGuy[runningImageIndex]}
        contentFit="stretch"
      />
    </View>
  );
}

function makeViewStyle(xBody, yBody, widthBody) {
  return StyleSheet.create({
    position: "absolute",
    width: widthBody,
    height: widthBody,
    left: xBody,
    top: yBody,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  });
}

function makeCharacterStyle(xImage, yImage, widthImage) {
  return StyleSheet.create({
    width: widthImage,
    height: widthImage,
    left: xImage,
    top: yImage,
    borderWidth: 1,
    borderColor: "black",
  });
}