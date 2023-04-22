import { useDispatch } from "react-redux";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { playSound } from "../utils/playSound";
import {
  backToMainPage,
  removeModal,
  restartGame,
  setIsFadeOut,
} from "../features/gameSlice";
import { start, select } from "../../assets/audio";

export default function PauseMenu({
  gameEngine,
  entities,
  onSelectStage,
  isGameOver,
  onSetConfig
}) {
  const dispatch = useDispatch();

  const handleRestartGame = () => {
    dispatch(setIsFadeOut(true));
    playSound(start, 1);
    setTimeout(() => {
      dispatch(restartGame());
      gameEngine.swap(entities);
    }, 700);
  };

  const handleBackToMainPage = () => {
    dispatch(setIsFadeOut(true));
    playSound(select, 1);
    dispatch(removeModal());
    setTimeout(() => {
      dispatch(backToMainPage());
      gameEngine.swap(entities);
    }, 700);
  };

  const handleModalClose = () => {
    playSound(select, 1);
    dispatch(removeModal());
  };

  const handleSelectStage = () => {
    playSound(select, 1);
    onSelectStage(true);
  };

  const handleSetConfig = () => {
    playSound(select, 1);
    onSetConfig(true);
  };

  return (
    <View style={styles.container}>
      {isGameOver ? (
        <View style={styles.resultContainer}>
          <Text style={styles.title}>GAME OVER</Text>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.title}>MENU</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.messageBox}
        onPress={handleSelectStage}
      >
        <Text style={styles.message}>SELECT STAGE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.messageBox} onPress={handleRestartGame}>
        <Text style={styles.message}>RESTART GAME</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.messageBox}
        onPress={handleBackToMainPage}
      >
        <Text style={styles.message}>MAIN PAGE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.messageBox}
        onPress={handleSetConfig}
      >
        <Text style={styles.message}>CONFIG GYRO</Text>
      </TouchableOpacity>
      {!isGameOver && (
        <TouchableOpacity style={styles.messageBox} onPress={handleModalClose}>
          <Text style={styles.message}>CONTINUE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    width: "95%",
    borderRadius: 5,
    borderWidth: 4,
    borderColor: "SaddleBrown",
    marginBottom: 20,
    backgroundColor: "gray",
  },
  messageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    width: "95%",
    borderWidth: 3,
    marginBottom: 2,
    borderRadius: 5,
  },
  message: {
    fontFamily: "menu-font",
    color: "white",
    fontSize: 20,
  },
  title: {
    fontFamily: "menu-font",
    fontWeight: "bold",
    color: "black",
    fontSize: 28,
  },
});
