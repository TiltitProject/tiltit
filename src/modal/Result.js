import { useDispatch } from "react-redux";
import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { playSound } from "../utils/playSound";
import {
  backToMainPage,
  removeModal,
  resetCollision,
} from "../features/gameSlice";
import { start, select } from "../../assets/audio";
import Modal from "./Modal";
import { apple, clock } from "../../assets/static";

export default function Result({
  onIsFadeout,
  gameEngine,
  entities,
  isModalVisible,
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
    <Modal isVisible={isModalVisible} onClose={onModalClose}>
      <View style={styles.resultContainer}>
        <View style={styles.scoreBox}>
          <Image source={apple} />
          <Text style={styles.scoreText}>X 10 = result</Text>
        </View>
        <View style={styles.scoreBox}>
          <Image style={styles.clock} source={clock} />
          <Text style={styles.scoreText}>X 10 = result</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>total = score</Text>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.messageBox} onPress={restartGame}>
          <Text style={styles.message}>Next Stage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageBox} onPress={restartGame}>
          <Text style={styles.message}>RESTART GAME</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageBox}
          onPress={handleBackToMainPage}
        >
          <Text style={styles.message}>MAIN PAGE</Text>
        </TouchableOpacity>
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
  clock: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
    resizeMode: "cover",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tan",
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: "SaddleBrown",
    marginBottom: 40,
  },
  scoreBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontFamily: "title-font",
  },
  messageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  message: {
    fontFamily: "title-font",
    color: "white",
    fontSize: 20,
  },
  title: {
    fontFamily: "menu-font",
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
});
