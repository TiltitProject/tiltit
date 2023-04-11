import React from "react";
import { Dimensions } from "react-native";
import FadeoutRow from "./FadeoutRow";

const windowHeight = Dimensions.get("window").height;

export default function Fadeout() {
  const startY1 = 10;
  const startY2 = startY1 - windowHeight / 6;
  const startY3 = startY1 - (windowHeight / 6) * 2;
  const startY4 = startY1 - (windowHeight / 6) * 3;
  const startY5 = startY1 - (windowHeight / 6) * 4;
  const startY6 = startY1 - (windowHeight / 6) * 5;
  const startY7 = startY1 - (windowHeight / 6) * 6;

  return (
    <>
      <FadeoutRow startY={startY1} width={1} startTime={0} />
      <FadeoutRow startY={startY2} width={1.5} startTime={0} />
      <FadeoutRow startY={startY3} width={1.5} startTime={0} />
      <FadeoutRow startY={startY4} width={2} startTime={0} />
      <FadeoutRow startY={startY5} width={2.5} startTime={0} />
      <FadeoutRow startY={startY6} width={2.5} startTime={0} />
      <FadeoutRow startY={startY7} width={3} startTime={0} />
    </>
  );
}
