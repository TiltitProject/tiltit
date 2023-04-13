import React from "react";
import { Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectCurrentPoint } from "../features/gameSlice";

export default function Header() {
  const currentPoint = useSelector(selectCurrentPoint);

  return (
    <>
      <Text style={styles.time}>time</Text>
      <Text style={styles.scoreMenu}>score</Text>
      <Text style={styles.score}>{currentPoint}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  time: {
    position: "absolute",
    top: "3%",
    fontSize: 40,
    fontWeight: "bold",
    margin: 20,
  },
  scoreMenu: {
    position: "absolute",
    top: 10,
    left: 10,
    fontFamily: "menu-font",
    fontSize: 15,
    margin: 20,
  },
  score: {
    position: "absolute",
    top: 35,
    left: 14,
    fontFamily: "menu-font",
    fontSize: 13,
    margin: 20,
  },
});
