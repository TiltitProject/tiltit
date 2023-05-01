import { useDispatch } from "react-redux";
import React  from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  removeModal,
  restartGame,
  setIsFadeOut,
  setCurrentStage,
} from "../features/gameSlice";
import { select } from "../../assets/audio";
import Modal from "./Modal";
import playAudio from "../utils/playAudio";

export default function SelectStage({
  isModalVisible,
  onGameStart,
  onSelectStage,
}) {
  const dispatch = useDispatch();
  // const [selectEffect, setSelectEffect] = useState(null);

  // const handleSelectSound = () => {
  //   playSound(selectEffect, setSelectEffect, select, 1);
  // };

  // useEffect(
  //   () => () => {
  //     if (selectEffect) {
  //       selectEffect.unloadAsync();
  //     }
  //   },
  //   [],
  // );

  const selectStage = (stage) => {
    dispatch(setIsFadeOut(true));
    playAudio(select);
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
    playAudio(select);
    dispatch(removeModal());
  };

  const handleSelectStage = () => {
    playAudio(select);
    onSelectStage(false);
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.title}>STAGE</Text>
        </View>
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
            <Text style={styles.message} onPress={handleSelectStage}>
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
