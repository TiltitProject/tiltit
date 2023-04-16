import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Dimensions,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import { useSelector, useDispatch } from "react-redux";
import {
  collideMonster,
  selectCrackEffect,
  selectModalVisible,
  selectRunningGame,
  showModal,
  runGame,
  getItemOnce,
  reachGoal,
} from "./features/gameSlice";
import entities from "./entities";
import Physics from "./physics";
import { crackedScreen, space } from "../assets/static";
import FadeIn from "./components/mountAnimation/FadeIn";
import Fadeout from "./components/mountAnimation/Fadeout";
import { playSound } from "./utils/playSound";
import { select } from "../assets/audio";
import Menu from "./modal/Menu";
import Header from "./components/Header";
import Goal from "./components/Goal";
import stage2 from "./entities/stage2";
import entityInfo from "./entities/entitiesInfo";
import { sheet } from "../assets/stageMaze.json";
import makeMapInfo from "./utils/makeMap";
import Item from "./components/Item";
import Result from "./modal/Result";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

export default function Stage() {
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [isFadeout, setIsFadeout] = useState(false);
  const [isFadeIn, setIsFadeIn] = useState(true);
  const running = useSelector(selectRunningGame);
  const isModalVisible = useSelector(selectModalVisible);
  const dispatch = useDispatch();
  const showingCrackedEffect = useSelector(selectCrackEffect);
  const mapInfo = makeMapInfo(sheet, entityInfo);

  useEffect(() => {
    dispatch(runGame(entityInfo.item.number));
    gameEngine?.swap(entities());
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
      case "clear":
        dispatch(reachGoal());
        break;
      case "get_item":
        dispatch(getItemOnce(e.payload));
        break;
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
      <ImageBackground source={space} style={styles.backgroundImage}>
        {isFadeIn && <FadeIn />}
        {isFadeout && <Fadeout />}
        {showingCrackedEffect && (
          <Image
            style={styles.crackedScreen}
            source={crackedScreen}
            contentFit="cover"
          />
        )}
        <Menu
          onIsFadeout={handleIsFadeout}
          gameEngine={gameEngine}
          entities={stage2}
          isModalVisible={isModalVisible}
          isGameOver={showingCrackedEffect}
        />
        {/* <Result/> */}
        <Header />
        <GameEngine
          ref={(ref) => {
            setGameEngine(ref);
          }}
          systems={[Physics]}
          entities={stage2()}
          running={running}
          onEvent={handleGameEngine}
          style={styles.gameEngine}
        >
          {Array.from(Array(entityInfo.item.number).keys()).map((num) => (
            <Item
              key={num + 1}
              position={mapInfo.item[num + 1].position}
              size={mapInfo.item[num + 1].size}
              image={entityInfo.item.image}
              num={num + 1}
            />
          ))}
          <Goal
            position={mapInfo.goal[1].position}
            size={mapInfo.goal[1].size}
          />
          <StatusBar style="auto" hidden />
        </GameEngine>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  crackedScreen: {
    zIndex: 2,
  },
  backgroundImage: {
    flex: 1,
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  gameEngine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
