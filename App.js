import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";

import entities from "./entities";
import Physics from "./physics";
import usePreloadAssets from "./utils/usePreloadAssets";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [appIsReady, setAppIsReady] = useState(false);

  usePreloadAssets(setAppIsReady, setRunning);

  const handleGameEngine = (e) => {
    switch (e.type) {
    case "game_over":
      setRunning(false);
      gameEngine.stop();
      break;
    case "new_point":
      setCurrentPoints(currentPoints + 1);
      break;
    default:
      break;
    }
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container}>
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
      {!running ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              gameEngine.swap(entities());
            }}
          >
            <Text style={styles.message}>START GAME</Text>
          </TouchableOpacity>
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
  },
  messageBox: {
    backgroundColor: "black",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  message: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
});
