import React from "react";
import { Modal, View, StyleSheet } from "react-native";

export default function MenuModal({ isVisible, children }) {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalContent}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "40%",
    width: "80%",
    backgroundColor: "#25292e",
    borderRadius: 15,
    position: "absolute",
    bottom: "30%",
    left: "10%",
    paddingVertical: 20,
    borderWidth: 10,
    zIndex: 99,
  },
});
