import { Dimensions } from "react-native";
import Dynamic from "../../assets/dynamicImage";
import {
  apple,
  arrowUpper,
  goldTwice,
  blockColumnThree,
  blockRowThree,
  ground,
} from "../../assets/static";

const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;
const BLOCK_SIZE = GAME_WIDTH / 16;

const entityInfo = {
  1: {
    columnMultiply: 1,
    gridSize: BLOCK_SIZE,
    block: {
      number: 30,
      renderEntity: 30,
      firstEntity: 30,
      size: BLOCK_SIZE,
      image: {
        row: blockRowThree,
        column: blockColumnThree,
        goldTwice,
        ground,
      },
    },
    flag: {
      number: 0,
      size: 50,
      image: arrowUpper,
    },
    goal: {
      number: 1,
      size: 72,
    },
    item: {
      number: 19,
      renderEntity: 19,
      firstEntity: 19,
      size: BLOCK_SIZE,
      image: apple,
    },
    monster: {
      number: 4,
      renderEntity: 4,
      firstEntity: 4,
      size: 40,
      specifics: {
        1: {
          direction: "row",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
        },
        2: {
          direction: "column",
          speed: 4,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
        },
        3: {
          direction: "column",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
        },
        4: {
          direction: "column",
          speed: 2.5,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
        },
      },
    },
  },
  2: {
    columnMultiply: 3,
    gridSize: BLOCK_SIZE,
    block: {
      number: 57,
      renderEntity: 38,
      firstEntity: 19,
      size: BLOCK_SIZE,
      image: {
        row: blockRowThree,
        column: blockColumnThree,
        goldTwice,
        ground,
      },
    },
    goal: {
      number: 0,
      size: 72,
    },
    flag: {
      number: 2,
      size: BLOCK_SIZE,
      image: arrowUpper,
    },
    item: {
      number: 27,
      renderEntity: 18,
      firstEntity: 9,
      size: BLOCK_SIZE,
      image: apple,
    },
    monster: {
      number: 6,
      renderEntity: 4,
      firstEntity: 2,
      size: BLOCK_SIZE * 2,
      specifics: {
        1: {
          direction: "row",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
        },
        2: {
          direction: "row",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
        },
        3: {
          direction: "row",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
        },
        4: {
          direction: "row",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
        },
        5: {
          direction: "row",
          speed: 3,
          distance: GAME_WIDTH / 10,
          image: Dynamic.rock,
        },
        6: {
          direction: "row",
          speed: 3,
          distance: GAME_WIDTH / 10,
          image: Dynamic.rock,
        },
      },
    },
  },
};

export default entityInfo;
