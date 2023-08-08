import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, ImageBackground, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import {
  selectCrackEffect,
  selectModalVisible,
  selectRunningGame,
  runGame,
  selectCurrentStage,
  selectStageClear,
  selectIsFadeOut,
  selectInitialRotation,
  selectRestartCount,
} from "./features/gameSlice";
import Physics from "./physics";
import { crackedScreen, space, forest } from "../assets/static";
import FadeIn from "./components/mountAnimation/FadeIn";
import Fadeout from "./components/mountAnimation/Fadeout";
import { swipe } from "../assets/audio";
import Menu from "./modal/Menu";
import Header from "./components/Header";
import Goal from "./components/Goal";
import stages from "./entities/stage";
import entityInfo from "./entities/entitiesInfo";
import makeMapInfo from "./utils/makMap/makeMapFx";
import Result from "./modal/Result";
import Item from "./components/Item";
import Special from "./components/Special";
import playAudio from "./utils/playAudio";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./constant/constant";
import { useAppDispatch, useAppSelector } from "./store";
import useGameDispatch from "./Hooks/useGameDispatch";

export interface GameEnginMethods extends GameEngine {
  stop: () => void;
}

export default function Stage() {
  const [gameEngine, setGameEngine] = useState<GameEnginMethods | null>(null);
  const [isFadeIn, setIsFadeIn] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const isFadeOut = useAppSelector(selectIsFadeOut);
  const stage = useAppSelector(selectCurrentStage);
  const running = useAppSelector(selectRunningGame);
  const isModalVisible = useAppSelector(selectModalVisible);
  const showingCrackedEffect = useAppSelector(selectCrackEffect);
  const hasClear = useAppSelector(selectStageClear);
  const restartCount = useAppSelector(selectRestartCount);
  const initialRotation = useAppSelector(selectInitialRotation);
  const handleGameEngine = useGameDispatch(gameEngine);
  const mapInfo = makeMapInfo(stage);
  const entities = stages(stage);

  useEffect(() => {
    dispatch(runGame({ stage, mapInfo }));
    entities.initialRotation = initialRotation;
    playAudio(swipe);

    setTimeout(() => {
      setIsFadeIn(false);
    }, 700);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={(stage === 1 && space) || (stage === 2 && forest)}
        style={styles.backgroundImage}
      >
        {isFadeIn && <FadeIn />}
        {isFadeOut && <Fadeout />}
        {showingCrackedEffect && (
          <Image style={styles.crackedScreen} source={crackedScreen} />
        )}
        <Menu
          gameEngine={gameEngine}
          entities={entities}
          isModalVisible={isModalVisible}
          isGameOver={showingCrackedEffect}
        />
        {hasClear && (
          <Result
            gameEngine={gameEngine}
            entities={entities}
            isModalVisible={hasClear}
          />
        )}
        <Header key={`header${restartCount}`} />
        <GameEngine
          key={`game${restartCount}`}
          ref={(ref: GameEnginMethods) => {
            setGameEngine(ref);
          }}
          systems={[Physics]}
          entities={entities}
          running={running}
          onEvent={handleGameEngine}
          style={styles.gameEngine}
        >
          <StatusBar style="auto" hidden />
        </GameEngine>
        {!isFadeIn &&
          Array.from(Array(entityInfo[stage].item.number).keys()).map((num) => (
            <Item
              key={`item${restartCount + num + 1}`}
              size={mapInfo.item[num + 1].size}
              specifics={entityInfo[stage].item.specifics[num + 1]}
              num={num + 1}
            />
          ))}
        {!isFadeIn &&
          Array.from(Array(entityInfo[stage].special.number).keys()).map(
            (num) => (
              <Special
                key={`special${restartCount + num + 1}`}
                size={mapInfo.special[num + 1].size}
                specifics={entityInfo[stage].special.specifics[num + 1]}
                num={num + 1}
              />
            ),
          )}
        {!isFadeIn && mapInfo.goal?.[1] && (
          <Goal
            position={mapInfo.goal[1]?.position}
            size={mapInfo.goal[1]?.size}
          />
        )}
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
