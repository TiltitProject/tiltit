import React from "react";
import { Dimensions } from "react-native";
import FadeoutRow from "./FadeoutRow";

const windowHeight = Dimensions.get("window").height;

export default function Fadeout() {
  const startY1 = 10;
  const startY2 = startY1 - windowHeight / 7;
  const startY3 = startY1 - (windowHeight / 8) * 2;
  const startY4 = startY1 - (windowHeight / 8) * 4;
  const startY5 = startY1 - (windowHeight / 8) * 6;
  const startY6 = startY1 - (windowHeight / 8) * 8;
  const startY7 = startY1 - (windowHeight / 8) * 10;
  const startY8 = startY1 - (windowHeight / 8) * 12;
  const startY9 = startY1 - (windowHeight / 8) * 14;

  return (
    <>
      <FadeoutRow startY={startY1} width={1} startTime={0} />
      <FadeoutRow startY={startY2} width={1} startTime={0} />
      <FadeoutRow startY={startY3} width={1} startTime={0} />
      <FadeoutRow startY={startY4} width={1.2} startTime={0} />
      <FadeoutRow startY={startY5} width={2} startTime={0} />
      <FadeoutRow startY={startY6} width={2.5} startTime={0} />
      <FadeoutRow startY={startY7} width={2.5} startTime={0} />
      <FadeoutRow startY={startY8} width={3} startTime={0} />
      <FadeoutRow startY={startY9} width={3.5} startTime={0} />
    </>
  );
}
