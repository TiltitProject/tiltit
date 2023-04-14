import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { goal } from "../../assets/static";
import { selectHasClear } from "../features/gameSlice";
import Dynamic from "../../assets/dynamicImage";

export default function Goal() {
  const [golImageIndex, setGoalImageIndex] = useState(0);
  const hasClear = useSelector(selectHasClear);

  useEffect(() => {
    const changeIndex = setTimeout(() => {
      if (golImageIndex < 8 && hasClear) {
        return setGoalImageIndex(golImageIndex + 1);
      }
    }, 100);

    return () => {
      clearInterval(changeIndex);
    };
  }, [golImageIndex, hasClear]);

  return (
    <View style={viewStyle(114, 217, 60, 60)}>
      {!hasClear ? (
        <Image style={makeStyle(60, 60)} source={goal} />
      ) : (
        <Image style={makeStyle(60, 60)} source={Dynamic.goal[golImageIndex]} />
      )}
    </View>
  );
}

function viewStyle(xBody, yBody, widthBody, heightBody) {
  return StyleSheet.create({
    position: "absolute",
    left: xBody,
    top: yBody,
    width: widthBody,
    height: heightBody,
    zIndex: 10,
  });
}

function makeStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
  });
}
