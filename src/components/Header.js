import React, { useEffect, useState, useRef } from "react";
import { Text, Animated, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentPoint,
  selectRunningGame,
  selectLeftTime,
  timeCountDown,
} from "../features/gameSlice";

export default function Header() {
  const currentPoint = useSelector(selectCurrentPoint);
  const leftTime = useSelector(selectLeftTime);
  const isGameRun = useSelector(selectRunningGame);
  const timeAnimation = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [timeStyle, setTimeStyle] = useState({
    color: "black",
    size: 25,
  });

  useEffect(() => {
    const setTime = setTimeout(() => {
      if (isGameRun) {
        dispatch(timeCountDown());
      }
    }, 1000);

    if (leftTime === 10) {
      setTimeStyle({
        color: "maroon",
        size: 40,
      });

      Animated.loop(
        Animated.timing(timeAnimation, {
          toValue: 4,
          duration: 100,
          useNativeDriver: true,
        }),
      ).start();
    }

    if (leftTime === 30) {
      setTimeStyle({
        color: "black",
        size: 25,
      });

      timeAnimation.stopAnimation();
    }

    return () => {
      clearInterval(setTime);
    };
  }, [leftTime, isGameRun]);

  const rotateInterpolation = timeAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ["0deg", "-10deg", "0deg", "10deg", "0deg"],
  });

  return (
    <>
      <Animated.Text
        style={[
          timeFontStyle(timeStyle.color, timeStyle.size),
          { transform: [{ rotate: rotateInterpolation }] },
        ]}
      >
        {leftTime}
      </Animated.Text>
      <Text style={styles.scoreMenu}>score</Text>
      <Text style={styles.score}>{currentPoint}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  time: {
    position: "absolute",
    top: "3%",
    fontFamily: "title-font",
    fontSize: 25,
    fontWeight: "bold",
    margin: 20,
    zIndex: 1,
    rotate: "0deg",
  },
  scoreMenu: {
    position: "absolute",
    top: 10,
    left: 10,
    fontFamily: "menu-font",
    fontSize: 15,
    margin: 20,
    zIndex: 1,
  },
  score: {
    position: "absolute",
    top: 35,
    left: 14,
    fontFamily: "menu-font",
    fontSize: 13,
    margin: 20,
    zIndex: 1,
  },
});

function timeFontStyle(color, size) {
  return StyleSheet.create({
    position: "absolute",
    top: "3%",
    color,
    fontFamily: "title-font",
    fontSize: size,
    fontWeight: "bold",
    margin: 20,
    zIndex: 1,
  });
}
