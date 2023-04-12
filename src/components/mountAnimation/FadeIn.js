import React from "react";
import { Dimensions } from "react-native";
import FadeInRow from "./FadeInRow";

const windowHeight = Dimensions.get("window").height;

export default function FadeIn() {
  const startY1 = 10;
  const startY2 = startY1 - windowHeight / 6;
  const startY3 = startY1 - (windowHeight / 6) * 2;
  const startY4 = startY1 - (windowHeight / 6) * 3;
  const startY5 = startY1 - (windowHeight / 6) * 4;
  const startY6 = startY1 - (windowHeight / 6) * 5;
  const startY7 = startY1 - (windowHeight / 6) * 6;
  const startY8 = startY1 - (windowHeight / 6) * 7;
  const startY9 = startY1 - (windowHeight / 6) * 8;

  return (
    <>
      <FadeInRow startY={startY1} width={4} startTime={0} />
      <FadeInRow startY={startY2} width={3.5} startTime={0} />
      <FadeInRow startY={startY3} width={3} startTime={0} />
      <FadeInRow startY={startY4} width={2.5} startTime={0} />
      <FadeInRow startY={startY5} width={1.5} startTime={0} />
      <FadeInRow startY={startY6} width={1} startTime={0} />
      <FadeInRow startY={startY7} width={1} startTime={0} />
      <FadeInRow startY={startY8} width={1} startTime={0} />
      <FadeInRow startY={startY9} width={1} startTime={0} />
    </>
  );
}
