import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { playSound } from "../utils/playSound";
import {
  backToMainPage,
  removeModal,
  restartGame,
} from "../features/gameSlice";
import { start, select } from "../../assets/audio";
import Modal from "./Modal";
import PauseMenu from "./PauseMenu";
import SelectStage from "./SelctStage";

export default function Menu({
  onIsFadeout,
  gameEngine,
  entities,
  isModalVisible,
  isGameOver,
}) {
  const [selectStage, setSelectStage] = useState(false);
  const dispatch = useDispatch();
  const handleSelectStage = (boolean) => {
    setSelectStage(boolean);
  };

  return (
    <Modal isVisible={isModalVisible}>
      {!selectStage ? (
        <PauseMenu
          gameEngine={gameEngine}
          entities={entities}
          onSelectStage={handleSelectStage}
          isGameOver={isGameOver}
        />
      ) : (
        <SelectStage
          gameEngine={gameEngine}
          entities={entities}
          onSelectStage={handleSelectStage}
        />
      )}
    </Modal>
  );
}
