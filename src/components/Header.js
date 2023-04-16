import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentPoint,
  selectRunningGame,
  selectLeftTime,
  timeCountDown
} from "../features/gameSlice";

export default function Header() {
  const currentPoint = useSelector(selectCurrentPoint);
  const leftTime = useSelector(selectLeftTime);
  const isGameRun = useSelector(selectRunningGame);
  const dispatch = useDispatch();

  useEffect(() => {
    const setTime = setTimeout(() => {
      if (isGameRun) {
        dispatch(timeCountDown());
      }
    }, 1000);

    return () => {
      clearInterval(setTime);
    };
  }, [leftTime, isGameRun]);

  return (
    <>
      <Text style={styles.time}>{leftTime}</Text>
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
