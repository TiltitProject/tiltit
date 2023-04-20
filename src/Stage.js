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
  selectMapInfo,
  stopPlayer,
  applyTranslateUpper,
  invisibleAllItems,
  completeMove,
  setStage,
  selectStage,
  selectMapState,
  applyTranslateRow,
  selectIsFadeOut,
  setIsFadeOut,
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
import stage1 from "./entities/stage1";
import stage2 from "./entities/stage2";
import entityInfo from "./entities/entitiesInfo";
import makeMapInfo from "./utils/makeMap";
// import Item from "./components/Item";
import Result from "./modal/Result";
import stageSheet from "../assets/stageSheet.json";
import Flag from "./components/FlagBefore";
import Item from "./components/ItemBefore";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

export default function Stage() {
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
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
  const map = stage2(stage);

  useEffect(() => {
    dispatch(runGame(entityInfo[stage].item.number));
    dispatch(setMapInfo({ stage, mapInfo }));

    setTimeout(() => {
      setIsFadeIn(false);
    }, 700);
  }, []);

  const handleIsFadeout = () => {
    setIsFadeOut(true);
  };

  const handleModalOpen = () => {
    dispatch(showModal());
    playSound(select, 1);
  };

  const handleGameEngine = (e) => {
    switch (e.type) {
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
        {isFadeOut && <Fadeout />}
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
          entities={stage2(stage)}
          isModalVisible={isModalVisible}
          isGameOver={showingCrackedEffect}
        />
        <Result
          onIsFadeout={handleIsFadeout}
          gameEngine={gameEngine}
          entities={stage2(stage)}
          isModalVisible={hasClear}
        />
        <Header />
        <GameEngine
          ref={(ref) => {
            setGameEngine(ref);
          }}
          systems={[Physics]}
          entities={stage2(stage)}
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
                  image={entityInfo[stage].item.image}
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
