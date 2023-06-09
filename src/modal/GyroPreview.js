import { useSelector } from "react-redux";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { selectInitialRotation } from "../features/gameSlice";
import configPhysics from "../ConfigPhysics";
import ConfigStage from "../entities/configStage";

export default function PreviewConfig({
  isModalVisible,
  onOpenPreview,
  onSetConfig,
}) {
  const initialRotation = useSelector(selectInitialRotation);
  const entities = ConfigStage();
  entities.initialRotation = initialRotation;

  const handleOpenPreview = () => {
    onOpenPreview(false);
  };

  const handleModalClose = () => {
    onOpenPreview(false);
    onSetConfig();
  };

  return (
    <Modal animationType="slide" transparent isVisible={isModalVisible}>
      <View style={styles.modalContent}>
        <View style={styles.container}>
          <GameEngine
            systems={[configPhysics]}
            entities={entities}
            running
            style={styles.gameEngine}
          ></GameEngine>
          <View style={styles.configButton}>
            <TouchableOpacity
              style={styles.messageBox}
              onPress={handleModalClose}
            >
              <Text style={styles.message}>CONFIRM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.messageBox}
              onPress={handleOpenPreview}
            >
              <Text style={styles.message}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "70%",
    width: "80%",
    backgroundColor: "#25292e",
    borderRadius: 15,
    position: "absolute",
    bottom: "15%",
    left: "10%",
    paddingVertical: 10,
    borderWidth: 10,
    zIndex: 100,
  },
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
  gameEngine: {
    position: "absolute",
    top: 0,
    left: "14%",
    right: 0,
    bottom: 0,
    height: "80%",
    width: "80%",
    backgroundColor: "white",
  },
  configButton: {
    position: "absolute",
    flex: 1,
    top: "85%",
    left: "9%",
    right: 0,
    bottom: 0,
  },
});
