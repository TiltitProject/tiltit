import { Dimensions } from "react-native";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;
const BLOCK_SIZE = GAME_WIDTH / 16;

const mockEntity = {
  block: {
    number: 0,
    size: 0,
  },
  monster: {
    number: 0,
    size: 0,
  },
};

const makeObject = (entity) => {
  const objects = {
    block: {},
    monster: {},
  };
  Array.from(Array(entity.block.number).keys()).forEach((num) => {
    objects.block[`s${num + 1}`] = {
      row: [],
      col: [],
    };
  });
  Array.from(Array(entity.monster.number).keys()).forEach((num) => {
    objects.monster[`m${num + 1}`] = {
      row: [],
      col: [],
    };
  });
  return objects;
};

const makeInitialMap = (entity) => {
  const objects = {
    block: {},
    monster: {},
  };
  Array.from(Array(entity.block.number).keys()).forEach((num) => {
    objects.block[num + 1] = {
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
  Array.from(Array(entity.monster.number).keys()).forEach((num) => {
    objects.monster[num + 1] = {
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

const makeObjectHash = (data, entity) => {
  const objectHashInfo = makeObject(entity);
  const columnArray = Object.values(data);

  columnArray.forEach((eachColumn, columnIndex) => {
    const rowArray = Object.values(eachColumn);

    rowArray.forEach((object, rowIndex) => {
      if (object && [...object].includes("s")) {
        objectHashInfo.block[object]?.row.push(rowIndex);
        objectHashInfo.block[object]?.col.push(columnIndex);
      }
      if (object && [...object].includes("m")) {
        objectHashInfo.monster[object]?.row.push(rowIndex);
        objectHashInfo.monster[object]?.col.push(columnIndex);
      }
    });
  });

  return objectHashInfo;
};

const applyPositionWidth = (hashInfo, staticObject, entity) => {
  const blockHashArray = Object.values(hashInfo.block);
  const monsterHashArray = Object.values(hashInfo.monster);

  blockHashArray.forEach((object, index) => {
    const propIndex = object.col.length - 1;
    const height = (object.col[propIndex] - object.col[0] + 1) * entity.block.size;
    const width = (object.row[propIndex] - object.row[0] + 1) * entity.block.size;
    const margin = FLOOR_WIDTH / 2;
    const y = margin + 10 + height / 2 + object.col[0] * entity.gridSize;
    const x = margin + width / 2 + object.row[0] * entity.gridSize;

    staticObject.block[index + 1].size.height = height;
    staticObject.block[index + 1].size.width = width;
    staticObject.block[index + 1].position.x = x;
    staticObject.block[index + 1].position.y = y;
  });

  monsterHashArray.forEach((object, index) => {
    const propIndex = object.col.length - 1;
    const height = (object.col[propIndex] - object.col[0] + 1) * entity.monster.size;
    const width = (object.row[propIndex] - object.row[0] + 1) * entity.monster.size;
    const margin = FLOOR_WIDTH / 2;
    const y = margin + 10 + height / 2 + object.col[0] * entity.gridSize;
    const x = margin + width / 2 + object.row[0] * entity.gridSize;

    staticObject.monster[index + 1].size.height = height;
    staticObject.monster[index + 1].size.width = width;
    staticObject.monster[index + 1].position.x = x;
    staticObject.monster[index + 1].position.y = y;
  });
};

const makeMapInfo = (data, entity) => {
  const mapHashInfo = makeObjectHash(data, entity);
  const staticObjects = makeInitialMap(entity);
  applyPositionWidth(mapHashInfo, staticObjects, entity);

  return staticObjects;
};

export default makeMapInfo;
