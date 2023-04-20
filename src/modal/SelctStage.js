import { useDispatch } from "react-redux";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { playSound } from "../utils/playSound";
import {
  backToMainPage,
  removeModal,
  restartGame,
  gameEngine,
  entities,
  setIsFadeOut,
  setCurrentStage,
} from "../features/gameSlice";
import { start, select } from "../../assets/audio";
import Modal from "./Modal";

export default function SelectStage({
  isModalVisible,
  onGameStart,
  onSelectStage,
}) {
  const dispatch = useDispatch();

  const selectStage = (stage) => {
    dispatch(setIsFadeOut(true));
    playSound(select, 1);
    setTimeout(() => {
      if (onSelectStage) {
        dispatch(restartGame());
        return dispatch(setCurrentStage(stage));
      }
      dispatch(setCurrentStage(stage));
      onGameStart();
    }, 700);
  };

  const handleModalClose = () => {
    playSound(select, 1);
    dispatch(removeModal());
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.title}>STAGE</Text>
        </View>
        <TouchableOpacity style={styles.messageBox}>
          <Text style={styles.message} onPress={() => selectStage(0)}>
            TUTORIAL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageBox}
          onPress={() => selectStage(1)}
        >
          <Text style={styles.message}>STAGE1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageBox}
          onPress={() => selectStage(2)}
        >
          <Text style={styles.message}>STAGE2</Text>
        </TouchableOpacity>
        {onSelectStage ? (
          <TouchableOpacity style={styles.messageBox}>
            <Text style={styles.message} onPress={() => onSelectStage(false)}>
              BACK TO MENU
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.messageBox}
            onPress={handleModalClose}
          >
            <Text style={styles.message}>CLOSE</Text>
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
