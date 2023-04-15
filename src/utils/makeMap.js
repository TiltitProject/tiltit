import { Dimensions } from "react-native";
import { sheet } from "./stageMaze.json";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;
const BLOCK_SIZE = GAME_WIDTH / 16;

const makeObject = (objectNum) => {
  const objects = {};
  Array.from(Array(objectNum).keys()).forEach((num) => {
    objects[num + 1] = {
      row: [],
      col: [],
    };
  });

  return objects;
};

const makeInitialMap = (objectNum) => {
  const objects = {};
  Array.from(Array(objectNum).keys()).forEach((num) => {
    objects[num + 1] = {
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 0,
        height: 0,
      },
    };
  });

  return objects;
};

const makeObjectHash = (objectNum) => {
  const objectHashInfo = makeObject(objectNum);
  const columnArray = Object.values(sheet);

  columnArray.forEach((eachColumn, columnIndex) => {
    const rowArray = Object.values(eachColumn);
    rowArray.forEach((object, rowIndex) => {
      if (object) {
        objectHashInfo[object].row.push(rowIndex + 1);
        objectHashInfo[object].col.push(columnIndex + 1);
      }
    });
  });

  return objectHashInfo;
};

const makeMapInfo = () => {
  const objectHashInfo = makeObjectHash(31);
  const initialMap = makeInitialMap(31);
  const objectHashArray = Object.values(objectHashInfo);

  objectHashArray.forEach((object, index) => {
    const propIndex = object.col.length - 1;
    const height = (object.col[propIndex] - object.col[0] + 1) * BLOCK_SIZE;
    const width = (object.row[propIndex] - object.row[0] + 1) * BLOCK_SIZE;
    const margin = FLOOR_WIDTH / 2;
    const y = margin + height / 2 + object.col[0] * BLOCK_SIZE;
    const x = margin + width / 2 + object.row[0] * BLOCK_SIZE;

    initialMap[index + 1].size.height = height;
    initialMap[index + 1].size.width = width;
    initialMap[index + 1].position.x = x;
    initialMap[index + 1].position.y = y;
  });
  return initialMap;
};

export default makeMapInfo;
