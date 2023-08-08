import React from "react";
import { selectPage, selectRestartCount } from "./features/gameSlice";
import MainPage from "./MainPage";
import Stage from "./GameEngine";
import { useAppSelector } from "./store";

export default function Root() {
  const currentPage = useAppSelector(selectPage);
  const restartCount = useAppSelector(selectRestartCount);

  return (
    <>
      {currentPage === "MainPage" && <MainPage />}
      {currentPage === "Stage" && <Stage key={restartCount} />}
    </>
  );
}
