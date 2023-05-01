import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { goal } from "../../assets/static";
import { selectGetTrophy, applyStageResult } from "../features/gameSlice";
import Dynamic from "../../assets/dynamicImage";

export default function Goal({ position, size }) {
  const [golImageIndex, setGoalImageIndex] = useState(0);
  const widthBody = size.width;
  const heightBody = size.height;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;
  const dispatch = useDispatch();
  const getTrophy = useSelector(selectGetTrophy);

  useEffect(() => {
    const changeIndex = setTimeout(() => {
      if (golImageIndex < 8 && getTrophy) {
        return setGoalImageIndex(golImageIndex + 1);
      }
    }, 200);

    if (golImageIndex === 8) {
      setTimeout(() => {
        dispatch(applyStageResult());
      }, 300);
    }

    return () => {
      clearTimeout(changeIndex);
    };
  }, [golImageIndex, getTrophy]);

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      {!getTrophy ? (
        <Image style={makeStyle(widthBody, heightBody)} source={goal} />
      ) : (
        <Image
          style={makeStyle(widthBody, heightBody)}
          source={Dynamic.goal[golImageIndex]}
        />
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
    zIndex: 1,
  });
}

function makeStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
  });
}
