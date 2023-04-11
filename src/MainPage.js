import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Audio } from "expo-av";
import { backgroundImage } from "../assets/static";
import { playSound } from "./utils/playSound";
import { hopefulBGM, start } from "../assets/audio";
import { changePage } from "./features/gameSlice";

export default function MainPage() {
  const dispatch = useDispatch();
  const [BGM, setBGM] = useState(null);

  useEffect(() => {
    const playBGM = async () => {
      const { sound } = await Audio.Sound.createAsync(hopefulBGM, {
        isLooping: true,
      });

      setBGM(sound);
      await sound.setVolumeAsync(0.7);
      await sound.playAsync();
    };
    playBGM();
  }, []);

  const gameStart = () => {
    dispatch(changePage("Stage"));
    playSound(start, 1);
    BGM.unloadAsync();
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <Text style={styles.title}>Tiltit!</Text>
        <TouchableOpacity style={styles.messageBox}>
          <Text style={styles.textBox}>SELECT CHARACTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageBox} onPress={gameStart}>
          <Text style={styles.textBox}>START GAME</Text>
        </TouchableOpacity>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    color: "white",
    fontFamily: "menu-font",
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#000000a0",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
  },
});
