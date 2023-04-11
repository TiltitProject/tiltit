import React from "react";
import { useSelector } from "react-redux";
import { selectPage } from "./features/gameSlice";
import MainPage from "./MainPage";
import Stage from "./Stage";

export default function Game() {
  const currentPage = useSelector(selectPage);

  return (
    <>
      {currentPage === "MainPage" && <MainPage />}
      {currentPage === "Stage" && <Stage />}
    </>
  );
}
