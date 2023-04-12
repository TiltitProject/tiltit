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
    height: "30%",
    width: "80%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    position: "absolute",
    bottom: "35%",
    left: "10%",
    paddingVertical: 30,
    borderWidth: 10,
    zIndex: 99,
  },
});
