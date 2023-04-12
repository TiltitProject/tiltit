import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { useSelector, useDispatch } from "react-redux";
import {
  resetCollision,
  collideMonster,
  selectCrackEffect,
  backToMainPage,
  selectModalVisible,
  selectRunningGame,
  showModal,
  removeModal,
  runGame,
} from "./features/gameSlice";
import entities from "./entities";
import Physics from "./physics";
import { crackedScreen } from "../assets/static";
import MenuModal from "./modal/MenuModal";
import FadeIn from "./components/mountAnimation/FadeIn";
import Fadeout from "./components/mountAnimation/Fadeout";
import { playSound } from "./utils/playSound";
import { start, select } from "../assets/audio";

export default function Stage() {
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [isFadeout, setIsFadeout] = useState(false);
  const [isFadeIn, setIsFadeIn] = useState(true);
  const running = useSelector(selectRunningGame);
  const isModalVisible = useSelector(selectModalVisible);
  const dispatch = useDispatch();
  const showingCrackedEffect = useSelector(selectCrackEffect);

  useEffect(() => {
    dispatch(runGame());
    setTimeout(() => {
      setIsFadeIn(false);
    }, 700);
  }, []);

  const handleModalOpen = () => {
    dispatch(showModal());
    playSound(select, 1);
  };
  const restartGame = () => {
    playSound(start, 1);
    dispatch(resetCollision());
    gameEngine.swap(entities());
  };

  const handleBackToMainPage = () => {
    setIsFadeout(true);
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

  const handleGameEngine = (e) => {
    switch (e.type) {
      case "game_over":
        dispatch(collideMonster());
        gameEngine.stop();
        break;
      case "new_point":
        setCurrentPoints(currentPoints + 1);
        break;
      case "pause":
        handleModalOpen();
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {isFadeIn && <FadeIn />}
      {isFadeout && <Fadeout />}
      <MenuModal isVisible={isModalVisible} onClose={onModalClose}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.messageBox} onPress={restartGame}>
            <Text style={styles.message}>RESTART GAME</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.messageBox}
            onPress={handleBackToMainPage}
          >
            <Text style={styles.message}>MAIN PAGE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBox} onPress={onModalClose}>
            <Text style={styles.message}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </MenuModal>
      <Text style={styles.score}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={handleGameEngine}
        style={styles.gameEngine}
      >
        <StatusBar style="auto" hidden />
      </GameEngine>
      {showingCrackedEffect ? (
        <View style={styles.container}>
          <Image source={crackedScreen} contentFit="cover" />
          <MenuModal isVisible onClose={onModalClose}>
            <View style={styles.container}>
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
          </MenuModal>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    margin: 20,
  },
  gameEngine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "lightgreen",
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
    fontWeight: "bold",
    color: "white",
    fontSize: 22,
  },
});
