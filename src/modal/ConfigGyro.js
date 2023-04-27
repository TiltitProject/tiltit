import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import { playSound } from "../utils/playSound";
import { setInitialRotation } from "../features/gameSlice";
import { select } from "../../assets/audio";
import Modal from "./Modal";
import PreviewConfig from "./GyroPreview";

export default function Config({ onSetConfig, isModalVisible }) {
  const [{ beta, gamma }, setData] = useState({
    beta: 0,
    gamma: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const dispatch = useDispatch();

  const subscribe = () => {
    setSubscription(
      DeviceMotion.addListener((result) => {
        setData(result.rotation);
      }),
    );
  };

  const handleSubscribe = () => {
    playSound(select, 1);
    subscribe();
  };

  const unsubscribe = () => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(null);
  };

  const handleInitialRotation = () => {
    playSound(select, 1);
    dispatch(setInitialRotation({ beta, gamma }));
    unsubscribe();
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const handleOpenPreview = (boolean) => {
    playSound(select, 1);
    setOpenPreview(boolean);
  };

  const handleSetConfig = () => {
    playSound(select, 1);
    onSetConfig(false);
  };

  return (
    <Modal isVisible={isModalVisible}>
      {openPreview && (
        <PreviewConfig
          isModalVisible={openPreview}
          onOpenPreview={handleOpenPreview}
          onSetConfig={onSetConfig}
        />
      )}
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.title}>CONFIG GYRO</Text>
        </View>
        <TouchableOpacity style={styles.messageBox}>
          <Text style={subscription ? styles.axisInfo : styles.axisDone}>
            Y: {Math.round(beta * 57.29)} °
          </Text>
          <Text style={subscription ? styles.axisInfo : styles.axisDone}>
            X: {Math.round(gamma * 57.29)} °
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageBox}>
          <Text style={styles.message} onPress={() => handleOpenPreview(true)}>
            PREVIEW
          </Text>
        </TouchableOpacity>
        {subscription ? (
          <TouchableOpacity
            style={styles.messageBox}
            onPress={handleInitialRotation}
          >
            <Text style={styles.message}>CONFIRM</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.messageBox} onPress={handleSubscribe}>
            <Text style={styles.message}>RESET</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.messageBox}>
          <Text style={styles.message} onPress={handleSetConfig}>
            BACK TO MAIN
          </Text>
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
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    width: "95%",
    borderRadius: 5,
    borderWidth: 4,
    borderColor: "SaddleBrown",
    marginBottom: 40,
    backgroundColor: "gray",
  },
  messageBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    width: "95%",
    borderWidth: 3,
    marginBottom: 2,
    borderRadius: 5,
  },
  axisInfo: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    fontFamily: "menu-font",
    color: "white",
    fontSize: 15,
  },
  axisDone: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    fontFamily: "menu-font",
    color: "yellow",
    fontSize: 15,
  },
  message: {
    fontFamily: "menu-font",
    color: "white",
    fontSize: 20,
  },
  title: {
    fontFamily: "menu-font",
    fontWeight: "bold",
    color: "black",
    fontSize: 24,
  },
});
