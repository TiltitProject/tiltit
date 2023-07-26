import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import { backgroundImage } from "../assets/static";
import { hopefulBGM, start, select } from "../assets/audio";
import {
  changePage,
  selectModalVisible,
  showModal,
} from "./features/gameSlice";
import FadeIn from "./components/mountAnimation/FadeIn";
import Fadeout from "./components/mountAnimation/Fadeout";
import SelectStage from "./modal/SelectStage";
import ConfigGyro from "./modal/ConfigGyro";
import playAudio from "./utils/playAudio";
import makeMapFx from "./utils/makeMapFx";

export default function MainPage() {
  const dispatch = useDispatch();
  const [BGM, setBGM] = useState(null);
  const [isFadeout, setIsFadeout] = useState(false);
  const [isFadeIn, setIsFadeIn] = useState(true);
  const [config, setConfig] = useState(false);
  const isModalVisible = useSelector(selectModalVisible);

  useEffect(() => {
    const playBGM = async () => {
      const { sound } = await Audio.Sound.createAsync(hopefulBGM, {
        isLooping: true,
      });

      setBGM(sound);
      await sound.setVolumeAsync(0.4);
      await sound.playAsync();
    };
    playBGM();
    setTimeout(() => {
      setIsFadeIn(false);
    }, 700);

    return () => {
      if (BGM) {
        BGM.unloadAsync();
      }
    };
  }, []);

  const handleModalOpen = () => {
    dispatch(showModal());
    playAudio(select);
  };

  const handleGameStart = () => {
    setIsFadeout(true);
    playAudio(start);
    if (BGM) {
      BGM.unloadAsync();
    }
    setTimeout(() => {
      dispatch(changePage("Stage"));
    }, 700);
  };

  const handleSetConfig = (boolean) => {
    setConfig(boolean);
  };

  const openConfig = () => {
    playAudio(select);
    setConfig(true);
  };

  return (
    <View style={styles.container}>
      {isFadeIn && <FadeIn />}
      {isFadeout && <Fadeout />}
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.title}>Tiltit!</Text>
        <TouchableOpacity style={styles.messageBox}>
          <Text style={styles.textBox} onPress={openConfig}>
            CONFIG
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageBox} onPress={handleModalOpen}>
          <Text style={styles.textBox}>START GAME</Text>
        </TouchableOpacity>
        {config && (
          <ConfigGyro
            onSetConfig={handleSetConfig}
          />
        )}
        <SelectStage
          isModalVisible={isModalVisible}
          onGameStart={handleGameStart}
        />
        <StatusBar style="auto" hidden />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    top: 0,
    color: "white",
    fontFamily: "title-font",
    fontSize: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 200,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  messageBox: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    width: "85%",
    backgroundColor: "black",
    borderWidth: 3,
    marginBottom: 10,
    borderRadius: 5,
  },
  textBox: {
    color: "white",
    fontFamily: "menu-font",
    fontSize: 25,
    textAlign: "center",
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginVertical: 5,
  },
  transition: {
    position: "absolute",
    width: 100,
    height: 100,
    left: 40,
    top: 40,
    color: "black",
  },
});
