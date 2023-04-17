import { useDispatch } from "react-redux";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { playSound } from "../utils/playSound";
import {
  backToMainPage,
  removeModal,
  restartGame,
} from "../features/gameSlice";
import { start, select } from "../../assets/audio";
import Modal from "./Modal";

export default function Menu({
  onIsFadeout,
  gameEngine,
  entities,
  isModalVisible,
  isGameOver,
}) {
  const dispatch = useDispatch();

  const handleRestartGame = () => {
    playSound(start, 1);
    dispatch(restartGame());
    gameEngine.swap(entities());
  };

  const handleBackToMainPage = () => {
    onIsFadeout();
    playSound(select, 1);
    dispatch(removeModal());
    setTimeout(() => {
      dispatch(backToMainPage());
      gameEngine.swap(entities());
    }, 700);
  };

  const onModalClose = () => {
    playSound(select, 1);
    dispatch(removeModal());
  };

  return (
    <Modal isVisible={isModalVisible} onClose={onModalClose}>
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
        <TouchableOpacity style={styles.messageBox} onPress={handleRestartGame}>
          <Text style={styles.message}>RESTART GAME</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageBox}
          onPress={handleBackToMainPage}
        >
          <Text style={styles.message}>MAIN PAGE</Text>
        </TouchableOpacity>
        {!isGameOver && (
          <TouchableOpacity style={styles.messageBox} onPress={onModalClose}>
            <Text style={styles.message}>CONTINUE</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
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
    marginBottom: 40,
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
    fontFamily: "title-font",
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
});
