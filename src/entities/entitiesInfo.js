import { Dimensions } from "react-native";
import Dynamic from "../../assets/dynamicImage";
import {
  apple,
  arrowUpper,
  goldTwice,
  blockColumnThree,
  blockRowThree,
  ground,
  star,
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
    attack: {
      number: 0,
      size: BLOCK_SIZE,
      specifics: {
        1: {
          image: apple,
          round: 4,
        },
        2: {
          image: apple,
          round: 4,
        },
      },
    },
    boss: {
      number: 0,
      size: BLOCK_SIZE * 2,
      specifics: {
        1: {
          idleImage: Dynamic.skullIdle,
          deathImage: Dynamic.skullHit,
          round: 1,
          translateMap: {
            x: 0,
            y: 0,
          },
        },
      },
    },
    goal: {
      number: 1,
      size: 72,
    },
    special: {
      number: 0,
      size: BLOCK_SIZE,
      specifics: {
        1: {
          image: star,
          round: 1,
        },
        2: {
          image: star,
          round: 1,
        },
      },
    },
    item: {
      number: 19,
      renderEntity: 19,
      firstEntity: 19,
      size: BLOCK_SIZE,
      specifics: {
        1: {
          image: apple,
          round: 1,
        },
        2: {
          image: apple,
          round: 1,
        },
        3: {
          image: apple,
          round: 1,
        },
        4: {
          image: apple,
          round: 1,
        },
        5: {
          image: apple,
          round: 1,
        },
        6: {
          image: apple,
          round: 1,
        },
        7: {
          image: apple,
          round: 1,
        },
        8: {
          image: apple,
          round: 1,
        },
        9: {
          image: apple,
          round: 1,
        },
        10: {
          image: apple,
          round: 1,
        },
        11: {
          image: apple,
          round: 1,
        },
        12: {
          image: apple,
          round: 1,
        },
        13: {
          image: apple,
          round: 1,
        },
        14: {
          image: apple,
          round: 1,
        },
        15: {
          image: apple,
          round: 1,
        },
        16: {
          image: apple,
          round: 1,
        },
        17: {
          image: apple,
          round: 1,
        },
        18: {
          image: apple,
          round: 1,
        },
        19: {
          image: apple,
          round: 1,
        },
      },
    },
    monster: {
      number: 4,
      renderEntity: 4,
      firstEntity: 4,
      size: 40,
      specifics: {
        1: {
          axis: "x",
          speed: 2,
          distance: GAME_WIDTH / 7,
          image: Dynamic.rock,
          changeMove: false,
          round: 1,
          translateMap: {
            x: 0,
            y: 0,
          },
          alive: true,
          onPosition: false,
          guideMissile: false,
          moved: 0,
        },
        2: {
          axis: "y",
          speed: 4,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
          round: 1,
          translateMap: {
            x: 0,
            y: 0,
          },
          alive: true,
          onPosition: false,
          guideMissile: false,
          moved: 0,
        },
        3: {
          axis: "y",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
          round: 1,
          translateMap: {
            x: 0,
            y: 0,
          },
          alive: true,
          onPosition: false,
          guideMissile: false,
          moved: 0,
        },
        4: {
          axis: "y",
          speed: 2.5,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rock,
          changeMove: false,
          round: 1,
          translateMap: {
            x: 0,
            y: 0,
          },
          alive: true,
          onPosition: false,
          guideMissile: false,
          moved: 0,
        },
      },
    },
  },
  2: {
    columnMultiply: 3,
    gridSize: BLOCK_SIZE,
    block: {
      number: 55,
      renderEntity: 37,
      firstEntity: 18,
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
      number: 3,
      size: BLOCK_SIZE,
      image: arrowUpper,
    },
    special: {
      number: 2,
      size: BLOCK_SIZE,
      specifics: {
        1: {
          image: star,
          round: 2,
        },
        2: {
          image: star,
          round: 3,
        },
      },
    },
    attack: {
      number: 3,
      size: BLOCK_SIZE,
      specifics: {
        1: {
          image: apple,
          round: 4,
          onPosition: false,
          moved: 0,
        },
        2: {
          image: apple,
          round: 4,
          onPosition: false,
          moved: 0,
        },
        3: {
          image: apple,
          round: 4,
          onPosition: false,
          moved: 0,
        },
      },
    },
    item: {
      number: 27,
      renderEntity: 18,
      firstEntity: 9,
      size: BLOCK_SIZE,
      specifics: {
        1: {
          image: apple,
          round: 1,
        },
        2: {
          image: apple,
          round: 1,
        },
        3: {
          image: apple,
          round: 1,
        },
        4: {
          image: apple,
          round: 1,
        },
        5: {
          image: apple,
          round: 1,
        },
        6: {
          image: apple,
          round: 1,
        },
        7: {
          image: apple,
          round: 1,
        },
        8: {
          image: apple,
          round: 1,
        },
        9: {
          image: apple,
          round: 1,
        },
        10: {
          image: apple,
          round: 2,
        },
        11: {
          image: apple,
          round: 2,
        },
        12: {
          image: apple,
          round: 2,
        },
        13: {
          image: apple,
          round: 2,
        },
        14: {
          image: apple,
          round: 2,
        },
        15: {
          image: apple,
          round: 2,
        },
        16: {
          image: apple,
          round: 2,
        },
        17: {
          image: apple,
          round: 2,
        },
        18: {
          image: apple,
          round: 2,
        },
        19: {
          image: apple,
          round: 3,
        },
        20: {
          image: apple,
          round: 3,
        },
        21: {
          image: apple,
          round: 3,
        },
        22: {
          image: apple,
          round: 3,
        },
        23: {
          image: apple,
          round: 3,
        },
        24: {
          image: apple,
          round: 3,
        },
        25: {
          image: apple,
          round: 3,
        },
        26: {
          image: apple,
          round: 3,
        },
        27: {
          image: apple,
          round: 3,
        },
      },
    },
    boss: {
      number: 1,
      size: BLOCK_SIZE,
      specifics: {
        1: {
          idleImage: Dynamic.skullIdle,
          deathImage: Dynamic.skullHit,
          round: 4,
          axis: "x",
          speed: 2,
          distance: GAME_WIDTH / 5,
          changeMove: false,
          alive: true,
          translateMap: {
            x: 1,
            y: 2,
          },
          HP: 20,
        },
      },
    },
    monster: {
      number: 6,
      renderEntity: 4,
      firstEntity: 2,
      size: BLOCK_SIZE * 2,
      specifics: {
        1: {
          axis: "x",
          speed: 2,
          distance: GAME_WIDTH / 7,
          image: Dynamic.mushroom,
          changeMove: false,
          alive: true,
          round: 1,
          translateMap: {
            x: 0,
            y: 0,
          },
          onPosition: false,
          moved: 0,
        },
        2: {
          axis: "x",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.rabbit,
          changeMove: false,
          alive: true,
          round: 1,
          translateMap: {
            x: 0,
            y: 0,
          },
          onPosition: false,
          moved: 0,
        },
        3: {
          axis: "x",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.blueBird,
          changeMove: false,
          alive: true,
          round: 2,
          translateMap: {
            x: 0,
            y: 1,
          },
          onPosition: false,
          moved: 0,
        },
        4: {
          axis: "x",
          speed: 5,
          distance: GAME_WIDTH / 5,
          image: Dynamic.blueBird,
          changeMove: false,
          alive: true,
          round: 2,
          translateMap: {
            x: 0,
            y: 1,
          },
          onPosition: false,
          guideMissile: false,
          moved: 0,
        },
        5: {
          axis: "x",
          speed: 5,
          distance: GAME_WIDTH / 5,
          image: Dynamic.radish,
          changeMove: false,
          alive: true,
          round: 3,
          translateMap: {
            x: 1,
            y: 1,
          },
          onPosition: false,
          guideMissile: false,
          moved: 0,
        },
        6: {
          axis: "x",
          speed: 3,
          distance: GAME_WIDTH / 5,
          image: Dynamic.mushroom,
          changeMove: false,
          alive: true,
          round: 3,
          translateMap: {
            x: 1,
            y: 1,
          },
          onPosition: false,
          guideMissile: false,
          moved: 0,
        },
      },
    },
  },
};

export default entityInfo;
