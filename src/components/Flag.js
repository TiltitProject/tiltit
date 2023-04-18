import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { flag } from "../../assets/static";

export default function Flag({ position, size }) {
  const widthBody = size.width;
  const heightBody = size.height;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2 - 10;

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      <Image style={makeStyle(widthBody, heightBody)} source={flag} />
    </View>
  );
}

function viewStyle(xBody, yBody, widthBody, heightBody) {
  return StyleSheet.create({
    position: "absolute",
    left: xBody,
    top: yBody,
    width: widthBody,
    height: heightBody,
    zIndex: 10,
  });
}

function makeStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
  });
}
