import { useDispatch } from "react-redux";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { playSound } from "../utils/playSound";
import {
  backToMainPage,
  removeModal,
  resetCollision,
} from "../features/gameSlice";
import { start, select } from "../../assets/audio";
import MenuModal from "./MenuModal";

export default function Menu({
  onIsFadeout,
  gameEngine,
  entities,
  isModalVisible,
  isGameOver,
}) {
  const dispatch = useDispatch();

  const restartGame = () => {
    playSound(start, 1);
    dispatch(resetCollision());
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
    <MenuModal isVisible={isModalVisible} onClose={onModalClose}>
      <View style={styles.container}>
        {!isGameOver && (
          <View style={styles.messageBox}>
            <Text style={styles.title}>GAME OVER</Text>
          </View>
        )}
        <TouchableOpacity style={styles.messageBox} onPress={restartGame}>
          <Text style={styles.message}>RESTART GAME</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageBox}
          onPress={handleBackToMainPage}
        >
          <Text style={styles.message}>MAIN PAGE</Text>
        </TouchableOpacity>
        {isGameOver && (
          <TouchableOpacity style={styles.messageBox} onPress={onModalClose}>
            <Text style={styles.message}>CONTINUE</Text>
          </TouchableOpacity>
        )}
      </View>
    </MenuModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 20,
    zIndex: 1,
  },
  message: {
    fontFamily: "menu-font",
    color: "white",
    fontSize: 22,
  },
  title: {
    fontFamily: "menu-font",
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
});
