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
          axis: "x",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
        },
        2: {
          axis: "y",
          speed: 4,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
        },
        3: {
          axis: "y",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
        },
        4: {
          axis: "y",
          speed: 2.5,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
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
          axis: "y",
          speed: 3,
          distance: GAME_WIDTH / 4,
          image: Dynamic.rock,
          changeMove: false,
          round: 1,
          translateMap: {
            x: 0,
            y: 0,
          }
        },
        2: {
          axis: "x",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
          round: 1,
          translateMap: {
            x: 0,
            y: 0,
          }
        },
        3: {
          axis: "x",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
          round: 2,
          translateMap: {
            x: 0,
            y: 1,
          }
        },
        4: {
          axis: "x",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
          round: 2,
          translateMap: {
            x: 0,
            y: 1,
          }
        },
        5: {
          axis: "y",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
          round: 3,
          translateMap: {
            x: 1,
            y: 1,
          }
        },
        6: {
          axis: "x",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
          round: 3,
          translateMap: {
            x: 1,
            y: 1,
          }
        },
      },
    },
  },
};

export default entityInfo;
