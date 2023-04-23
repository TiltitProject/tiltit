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
  selectCurrentStage,
  selectStageClear,
  setMapInfo,
  applyTranslateUpper,
  invisibleAllItems,
  selectMapState,
  applyTranslateRow,
  selectIsFadeOut,
  selectInitialRotation,
  killMonster,
  getSpecialItemOnce,
  offSpecialMode,
} from "./features/gameSlice";
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
import makeMapInfo from "./utils/makeMap";
import Result from "./modal/Result";
import stageSheet from "../assets/stageSheet.json";
import Item from "./components/ItemBefore";
import Special from "./components/Special";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

export default function Stage() {
  const [gameEngine, setGameEngine] = useState(null);
  const isFadeOut = useSelector(selectIsFadeOut);
  const [isFadeIn, setIsFadeIn] = useState(true);
  const stage = useSelector(selectCurrentStage);
  const running = useSelector(selectRunningGame);
  const isModalVisible = useSelector(selectModalVisible);
  const dispatch = useDispatch();
  const showingCrackedEffect = useSelector(selectCrackEffect);
  const mapState = useSelector(selectMapState);
  const mapInfo = makeMapInfo(stageSheet[stage], entityInfo[stage]);
  const hasClear = useSelector(selectStageClear);
  const entities = stage2(stage);
  entities.initialRotation = useSelector(selectInitialRotation);

  useEffect(() => {
    dispatch(runGame(entityInfo[stage]));
    dispatch(setMapInfo({ stage, mapInfo }));

    setTimeout(() => {
      setIsFadeIn(false);
    }, 700);
  }, []);

  const handleModalOpen = () => {
    dispatch(showModal());
    playSound(select, 1);
  };

  const handleGameEngine = (e) => {
    switch (e.type) {
      case "off_specialItem":
        dispatch(offSpecialMode());
        break;
      case "get_specialItem":
        dispatch(getSpecialItemOnce(e.payload));
        break;
      case "kill_monster":
        dispatch(killMonster(e.payload));
        break;
      case "complete_move_row":
        dispatch(applyTranslateRow(e.payload));
        break;
      case "complete_move_upper":
        dispatch(applyTranslateUpper(e.payload));
        break;
      case "move_page":
        dispatch(invisibleAllItems());
        break;
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
        {isFadeOut && <Fadeout />}
        {showingCrackedEffect && (
          <Image
            style={styles.crackedScreen}
            source={crackedScreen}
            contentFit="cover"
          />
        )}
        <Menu
          gameEngine={gameEngine}
          entities={entities}
          isModalVisible={isModalVisible}
          isGameOver={showingCrackedEffect}
        />
        <Result
          gameEngine={gameEngine}
          entities={entities}
          isModalVisible={hasClear}
        />
        <Header />
        <GameEngine
          ref={(ref) => {
            setGameEngine(ref);
          }}
          systems={[Physics]}
          entities={entities}
          running={running}
          onEvent={handleGameEngine}
          style={styles.gameEngine}
        >
          {mapState[stage] &&
            Array.from(Array(entityInfo[stage].item.number).keys()).map(
              (num) => (
                <Item
                  key={`item${num + 1}`}
                  size={mapInfo.item[num + 1].size}
                  specifics={entityInfo[stage].item.specifics[num + 1]}
                  num={num + 1}
                />
              ),
            )}
          {mapState[stage] &&
            Array.from(Array(entityInfo[stage].special.number).keys()).map(
              (num) => (
                <Special
                  key={`special${num + 1}`}
                  size={mapInfo.special[num + 1].size}
                  specifics={entityInfo[stage].special.specifics[num + 1]}
                  num={num + 1}
                />
              ),
            )}
          {mapInfo.goal[1] && (
            <Goal
              position={mapInfo.goal[1].position}
              size={mapInfo.goal[1].size}
            />
          )}
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
