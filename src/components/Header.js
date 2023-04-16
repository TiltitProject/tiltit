import React, { useState, useEffect } from "react";
import { Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectCurrentPoint, selectRunningGame } from "../features/gameSlice";
import { clock } from "../../assets/static";

export default function Header() {
  const [restTime, setRestTime] = useState(30);
  const currentPoint = useSelector(selectCurrentPoint);
  const isGameRun = useSelector(selectRunningGame);

  useEffect(() => {
    const setTime = setTimeout(() => {
      if (isGameRun) {
        setRestTime(restTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(setTime);
    };
  }, [restTime, isGameRun]);

  return (
    <>
      <Text style={styles.time}>{restTime}</Text>
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
