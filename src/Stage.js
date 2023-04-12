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
import Menu from "./modal/Menu";

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

  const handleIsFadeout = () => {
    setIsFadeout(true);
  };

  const handleModalOpen = () => {
    dispatch(showModal());
    playSound(select, 1);
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
      <Menu
        onIsFadeout={handleIsFadeout}
        gameEngine={gameEngine}
        entities={entities}
        isModalVisible={isModalVisible}
        pause
      />
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
          <Menu
            onIsFadeout={handleIsFadeout}
            gameEngine={gameEngine}
            entities={entities}
            isModalVisible
          />
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
});
