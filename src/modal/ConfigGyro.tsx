import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Subscription } from "expo-sensors/build/Pedometer";
import { DeviceMotion } from "expo-sensors";
import { setInitialRotation } from "../features/gameSlice";
import { select } from "../../assets/audio";
import Modal from "./Modal";
import PreviewConfig from "./GyroPreview";
import playAudio from "../utils/playAudio";

interface ConfigProps {
  onSetConfig: (boolean: boolean) => void;
  isModalVisible?: boolean;
}

interface GyroData {
  beta: number;
  gamma: number;
}

export default function Config({ onSetConfig, isModalVisible }: ConfigProps) {
  const [{ beta, gamma }, setData] = useState<GyroData>({
    beta: 0,
    gamma: 0,
  });
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const dispatch = useDispatch();

  const subscribe = () => {
    setSubscription(
      DeviceMotion.addListener((result) => {
        setData(result.rotation);
      }),
    );
  };

  const handleSubscribe = () => {
    playAudio(select);
    subscribe();
  };

  const unsubscribe = () => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(null);
  };

  const handleInitialRotation = () => {
    playAudio(select);
    dispatch(setInitialRotation({ beta, gamma }));
    unsubscribe();
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const handleOpenPreview = (boolean: boolean) => {
    playAudio(select);
    setOpenPreview(boolean);
  };

  const handleSetConfig = () => {
    playAudio(select);
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
