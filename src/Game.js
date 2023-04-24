import React from "react";
import { useSelector } from "react-redux";
import { selectPage, selectRestartCount } from "./features/gameSlice";
import MainPage from "./MainPage";
import Stage from "./GameEngine";

export default function Game() {
  const currentPage = useSelector(selectPage);
  const restartCount = useSelector(selectRestartCount);

  return (
    <>
      {currentPage === "MainPage" && <MainPage />}
      {currentPage === "Stage" && <Stage key={restartCount} />}
    </>
  );
}
