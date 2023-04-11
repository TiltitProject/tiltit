import React, { useRef, useEffect } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { transition } from "../../assets/static";
import TransitionRow from "./TransitionRow";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function Fadeout() {
  const offsetY = 60;
  const destinationY1 = windowHeight - offsetY;
  const destinationY2 = (windowHeight / 7) * 6 - offsetY;
  const destinationY3 = (windowHeight / 7) * 5 - offsetY;
  const destinationY4 = (windowHeight / 7) * 4 - offsetY;
  const destinationY5 = (windowHeight / 7) * 3 - offsetY;
  const destinationY6 = (windowHeight / 7) * 2 - offsetY;
  const destinationY7 = (windowHeight / 7) * 1 - offsetY;

  return (
    <>
      <TransitionRow destinationY={destinationY1} startTime={0} />
      <TransitionRow destinationY={destinationY2} startTime={150} />
      <TransitionRow destinationY={destinationY3} startTime={300} />
      <TransitionRow destinationY={destinationY4} startTime={450} />
      <TransitionRow destinationY={destinationY5} startTime={600} />
      <TransitionRow destinationY={destinationY6} startTime={750} />
      <TransitionRow destinationY={destinationY7} startTime={900} />
    </>
  );
}
