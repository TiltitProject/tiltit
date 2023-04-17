import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { playSound } from "../utils/playSound";
import {
  backToMainPage,
  removeModal,
  restartGame,
  selectStageInfo,
  selectCurrentStage,
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
  const stage = useSelector(selectCurrentStage);
  const stageResult = useSelector(selectStageInfo)[stage];
  const [itemScore, setItemScore] = useState({
    number: stageResult.itemScore / 100,
    score: 0,
  });
  const [timeScore, setTimeScore] = useState({
    number: stageResult.leftTime,
    score: 0,
  });
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const countScore = setTimeout(() => {
      if (itemScore.score < stageResult.itemScore && totalScore === 0) {
        return setItemScore({
          number: itemScore.number - 1,
          score: itemScore.score + 100,
        });
      }

      if (itemScore.score === stageResult.itemScore && timeScore.number > 0) {
        return setTimeScore({
          number: timeScore.number - 1,
          score: timeScore.score + 50,
        });
      }
      if (timeScore.number === 0 && timeScore.score > 0) {
        setTotalScore((prev) => prev + 50);
        setTimeScore({
          ...timeScore,
          score: timeScore.score - 50,
        });
      }
      if (timeScore.number === 0 && itemScore.score > 0) {
        setTotalScore((prev) => prev + 100);
        setItemScore({
          ...itemScore,
          score: itemScore.score - 100,
        });
      }
    }, 50);

    return () => {
      clearTimeout(countScore);
    };
  }, [itemScore, timeScore, totalScore]);

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
      <View style={styles.resultContainer}>
        <View style={styles.scoreBox}>
          <Image style={styles.apple} source={apple} />
          <Text style={styles.scoreText}>
            {itemScore.number} X 100 = {itemScore.score}
          </Text>
        </View>
        <View style={styles.scoreBox}>
          <Image style={styles.clock} source={clock} />
          <Text style={styles.scoreText}>
            {timeScore.number} X 50 = {timeScore.score}
          </Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>total = {totalScore}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.messageBox} onPress={handleRestartGame}>
          <Text style={styles.message}>Next Stage</Text>
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
    marginHorizontal: 10,
    resizeMode: "cover",
  },
  apple: {
    height: 40,
    width: 40,
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
    marginBottom: 20,
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
    color: "white",
    fontSize: 30,
  },
});
