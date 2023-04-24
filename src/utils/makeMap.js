import { Dimensions } from "react-native";

const FLOOR_WIDTH = 32;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const makeObject = (entity) => {
  const objects = {
    block: {},
    monster: {},
    item: {},
    goal: {},
    flag: {},
    special: {},
    boss: {},
    attack: {},
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
  Array.from(Array(entity.item.number).keys()).forEach((num) => {
    objects.item[`i${num + 1}`] = {
      row: [],
      col: [],
    };
  });
  Array.from(Array(entity.goal?.number).keys()).forEach((num) => {
    objects.goal[`g${num + 1}`] = {
      row: [],
      col: [],
    };
  });
  Array.from(Array(entity.flag?.number).keys()).forEach((num) => {
    objects.flag[`f${num + 1}`] = {
      row: [],
      col: [],
    };
  });
  Array.from(Array(entity.special?.number).keys()).forEach((num) => {
    objects.special[`n${num + 1}`] = {
      row: [],
      col: [],
    };
  });
  Array.from(Array(entity.boss?.number).keys()).forEach((num) => {
    objects.boss[`b${num + 1}`] = {
      row: [],
      col: [],
    };
  });
  Array.from(Array(entity.attack?.number).keys()).forEach((num) => {
    objects.attack[`a${num + 1}`] = {
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
    item: {},
    goal: {},
    flag: {},
    special: {},
    boss: {},
    attack: {},
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
  Array.from(Array(entity.item.number).keys()).forEach((num) => {
    objects.item[num + 1] = {
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
  Array.from(Array(entity.goal?.number).keys()).forEach((num) => {
    objects.goal[num + 1] = {
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
  Array.from(Array(entity.flag?.number).keys()).forEach((num) => {
    objects.flag[num + 1] = {
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
  Array.from(Array(entity.special?.number).keys()).forEach((num) => {
    objects.special[num + 1] = {
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
  Array.from(Array(entity.boss?.number).keys()).forEach((num) => {
    objects.boss[num + 1] = {
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
  Array.from(Array(entity.attack?.number).keys()).forEach((num) => {
    objects.attack[num + 1] = {
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
      if (object && [...object].includes("i")) {
        objectHashInfo.item[object]?.row.push(rowIndex);
        objectHashInfo.item[object]?.col.push(columnIndex);
      }
      if (object && [...object].includes("g")) {
        objectHashInfo.goal[object]?.row.push(rowIndex);
        objectHashInfo.goal[object]?.col.push(columnIndex);
      }
      if (object && [...object].includes("f")) {
        objectHashInfo.flag[object]?.row.push(rowIndex);
        objectHashInfo.flag[object]?.col.push(columnIndex);
      }
      if (object && [...object].includes("n")) {
        objectHashInfo.special[object]?.row.push(rowIndex);
        objectHashInfo.special[object]?.col.push(columnIndex);
      }
      if (object && [...object].includes("b")) {
        objectHashInfo.boss[object]?.row.push(rowIndex);
        objectHashInfo.boss[object]?.col.push(columnIndex);
      }
      if (object && [...object].includes("a")) {
        objectHashInfo.attack[object]?.row.push(rowIndex);
        objectHashInfo.attack[object]?.col.push(columnIndex);
      }
    });
  });

  return objectHashInfo;
};

const setPositionWidth = (hashInfo, type, staticObject, entity) => {
  if (entity[type].number) {
    const hashArray = Object.values(hashInfo[type]);
    let offset = 0;
    if (
      type === "item" ||
      type === "goal" ||
      type === "flag" ||
      type === "special"
    ) {
      offset = entity.gridSize / 2;
    }

    hashArray.forEach((object, index) => {
      const propIndex = object.col.length - 1;
      const height =
        (object.col[propIndex] - object.col[0] + 1) * entity[type].size;
      const width =
        (object.row[propIndex] - object.row[0] + 1) * entity[type].size;
      const margin = FLOOR_WIDTH / 2;
      const y =
        -(entity.columnMultiply - 1) * WINDOW_HEIGHT +
        (entity.columnMultiply - 1) * FLOOR_WIDTH +
        margin +
        10 +
        offset +
        height / 2 +
        object.col[0] * entity.gridSize;
      const x = margin + width / 2 + offset + object.row[0] * entity.gridSize;

      staticObject[type][index + 1].size.height = height;
      staticObject[type][index + 1].size.width = width;
      staticObject[type][index + 1].position.x = x;
      staticObject[type][index + 1].position.y = y;
    });
  }
};

const makeMapInfo = (data, entity) => {
  const mapHashInfo = makeObjectHash(data, entity);
  const staticObjects = makeInitialMap(entity);
  setPositionWidth(mapHashInfo, "block", staticObjects, entity);
  setPositionWidth(mapHashInfo, "goal", staticObjects, entity);
  setPositionWidth(mapHashInfo, "item", staticObjects, entity);
  setPositionWidth(mapHashInfo, "monster", staticObjects, entity);
  setPositionWidth(mapHashInfo, "flag", staticObjects, entity);
  setPositionWidth(mapHashInfo, "special", staticObjects, entity);
  setPositionWidth(mapHashInfo, "boss", staticObjects, entity);
  setPositionWidth(mapHashInfo, "attack", staticObjects, entity);

  return staticObjects;
};

export default makeMapInfo;
