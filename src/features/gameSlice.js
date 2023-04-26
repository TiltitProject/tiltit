import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasCollideMonster: false,
  isGameRunning: true,
  crackEffect: false,
  currentPage: "MainPage",
  isModalVisible: false,
  runningGame: false,
  currentPoint: 0,
  leftTime: 30,
  getTrophy: false,
  hasClear: false,
  stageInfo: {
    1: {
      itemScore: 0,
      leftTime: 0,
      total: 0,
    },
    2: {
      itemScore: 0,
      leftTime: 0,
      total: 0,
    },
  },
  itemsVisible: {},
  currentStage: 2,
  isPlayerMove: true,
  restartCount: 0,
  mapState: {
    0: null,
    1: null,
    2: null,
  },
  isFadeOut: false,
  initialRotation: {
    beta: 0,
    gamma: 0,
  },
  aliveMonsters: {},
  specialItems: {},
  monsterFlyingVector: {
    x: 0,
    y: 0,
  },
  currentRound: 1,
  isSpecialMode: false,
  bossHP: 20,
  attackId: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    collideMonster: (state) => {
      state.hasCollideMonster = true;
      state.runningGame = false;
    },
    restartGame: (state) => {
      state.hasCollideMonster = false;
      state.crackEffect = false;
      state.runningGame = true;
      state.isModalVisible = false;
      state.getTrophy = false;
      state.hasClear = false;
      state.leftTime = 30;
      state.restartCount += 1;
      state.isFadeOut = true;
      state.currentRound = 1;
      state.isSpecialMode = false;
      state.bossHP = 20;
      state.attackId = null;
    },
    showCrackEffect: (state) => {
      state.crackEffect = true;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    runGame: (state, action) => {
      const monsterNumber = action.payload.monster.number;
      const itemNumber = action.payload.item.number;
      const specialItemNumber = action.payload.special.number;
      const items = {};
      const monsters = {};
      const specials = {};

      Array.from(Array(itemNumber).keys()).forEach((num) => {
        items[num + 1] = true;
      });
      Array.from(Array(monsterNumber).keys()).forEach((num) => {
        monsters[num + 1] = true;
      });
      Array.from(Array(specialItemNumber).keys()).forEach((num) => {
        specials[num + 1] = true;
      });

      state.itemsVisible = items;
      state.aliveMonsters = monsters;
      state.specialItems = specials;
      state.runningGame = true;
      state.getTrophy = false;
      state.hasClear = false;
      state.leftTime = 30;
      state.isFadeOut = false;
      state.currentRound = 1;
      state.isSpecialMode = false;
      state.bossHP = 20;
      state.attackId = null;
    },
    backToMainPage: (state) => {
      state.currentPage = "MainPage";
      state.isModalVisible = false;
      state.hasCollideMonster = false;
      state.isGameRunning = false;
      state.crackEffect = false;
    },
    showModal: (state) => {
      state.runningGame = false;
      state.isModalVisible = true;
    },
    removeModal: (state) => {
      state.isModalVisible = false;
      state.runningGame = true;
    },
    getTrophy: (state) => {
      state.getTrophy = true;
    },
    getItem: (state, action) => {
      state.itemsVisible[action.payload] = false;
      state.currentPoint += 100;
    },
    countDownLeftTime: (state) => {
      state.leftTime -= 1;
    },
    setStageResult: (state, action) => {
      const { currentStage, currentPoint, leftTime } = action.payload;

      state.stageInfo[currentStage].itemScore = currentPoint;
      state.stageInfo[currentStage].leftTime = leftTime;
      state.stageInfo[currentStage].total = currentPoint + leftTime * 50;
      state.runningGame = false;
      state.hasClear = true;
    },
    stopPlayer: (state) => {
      state.isPlayerMove = false;
    },
    setMapInfo: (state, action) => {
      const { stage, mapInfo } = action.payload;
      state.mapState[stage] = mapInfo;
    },
    pageMove: (state) => {
      state.isPlayerMove = false;
    },
    completeMove: (state) => {
      state.isPlayerMove = true;
      state.leftTime += 30;
    },
    hideItems: (state, action) => {
      const { specialItemKeys, itemKeys } = action.payload;
      itemKeys.forEach((num) => {
        state.itemsVisible[num] = false;
      });
      specialItemKeys.forEach((num) => {
        state.specialItems[num] = false;
      });
      state.isPlayerMove = false;
    },
    translateItemsY: (state, action) => {
      const { specialItemKeys, itemKeys, height, currentStage } =
        action.payload;

      itemKeys.forEach((num) => {
        state.itemsVisible[num] = true;
        state.mapState[currentStage].item[num].position.y += height;
      });

      specialItemKeys.forEach((num) => {
        state.specialItems[num] = true;
        state.mapState[currentStage].special[num].position.y += height;
      });

      state.isPlayerMove = true;
      state.leftTime += 30;
      state.currentRound += 1;
    },
    translateItemsX: (state, action) => {
      const { specialItemKeys, itemKeys, width, currentStage } = action.payload;

      itemKeys.forEach((num) => {
        state.itemsVisible[num] = true;
        state.mapState[currentStage].item[num].position.x += width;
      });

      specialItemKeys.forEach((num) => {
        state.specialItems[num] = true;
        state.mapState[currentStage].special[num].position.x += width;
      });

      state.isPlayerMove = true;
      state.leftTime += 30;
      state.currentRound += 1;
    },
    setStage: (state, action) => {
      const { stage, entities } = action.payload;
      state.stage[stage] = entities;
    },
    setCurrentStage: (state, action) => {
      state.currentStage = action.payload;
      state.restartCount += 1;
    },
    setIsFadeOut: (state, action) => {
      state.isFadeOut = action.payload;
      state.isModalVisible = false;
    },
    setInitialRotation: (state, action) => {
      const { beta, gamma } = action.payload;
      state.initialRotation.beta = beta;
      state.initialRotation.gamma = gamma;
    },
    killMonster: (state, action) => {
      const { x, y, number } = action.payload;
      state.aliveMonsters[number] = false;
      state.monsterFlyingVector.x = x;
      state.monsterFlyingVector.y = y;
    },
    getSpecialItem: (state, action) => {
      state.specialItems[action.payload] = false;
      state.isSpecialMode = true;
    },
    offSpecialMode: (state) => {
      state.isSpecialMode = false;
    },
    attackBoss: (state, action) => {
      state.bossHP -= 1;
      state.attackId = action.payload;
    },
  },
});

export const {
  collideMonster,
  runGame,
  stopGame,
  backToMainPage,
  changePage,
  showCrackEffect,
  restartGame,
  showModal,
  removeModal,
  getTrophy,
  setItemData,
  getItem,
  countDownLeftTime,
  setStageResult,
  stopPlayer,
  setMapInfo,
  pageMove,
  completeMove,
  hideItems,
  translateItemsY,
  translateItemsX,
  setStage,
  setCurrentStage,
  mapState,
  setIsFadeOut,
  setInitialRotation,
  killMonster,
  getSpecialItem,
  offSpecialMode,
  attackBoss,
} = gameSlice.actions;

export const selectCollideMonster = (state) => state.game.hasCollideMonster;
export const selectCrackEffect = (state) => state.game.crackEffect;
export const selectPage = (state) => state.game.currentPage;
export const selectRunningGame = (state) => state.game.runningGame;
export const selectModalVisible = (state) => state.game.isModalVisible;
export const selectCurrentPoint = (state) => state.game.currentPoint;
export const selectGetTrophy = (state) => state.game.getTrophy;
export const selectItemsVisible = (state) => state.game.itemsVisible;
export const selectLeftTime = (state) => state.game.leftTime;
export const selectCurrentStage = (state) => state.game.currentStage;
export const selectStageInfo = (state) => state.game.stageInfo;
export const selectStageClear = (state) => state.game.hasClear;
export const selectIsPlayerMove = (state) => state.game.isPlayerMove;
export const selectRestartCount = (state) => state.game.restartCount;
export const selectMapState = (state) => state.game.mapState;
export const selectIsFadeOut = (state) => state.game.isFadeOut;
export const selectInitialRotation = (state) => state.game.initialRotation;
export const selectAliveMonsters = (state) => state.game.aliveMonsters;
export const selectMonsterFlyingVector = (state) =>
  state.game.monsterFlyingVector;
export const selectCurrentRound = (state) => state.game.currentRound;
export const selectSpecialItem = (state) => state.game.specialItems;
export const selectIsSpecialMode = (state) => state.game.isSpecialMode;
export const selectBossHP = (state) => state.game.bossHP;
export const selectAttackId = (state) => state.game.attackId;

export const getItemOnce = (num) => (dispatch, getState) => {
  const canGetItem = selectItemsVisible(getState())[num];

  if (canGetItem) {
    dispatch(getItem(num));
  }
};

export const attackOnce = (num) => (dispatch, getState) => {
  const alreadyAttack = selectAttackId(getState());
  const bossAlive = selectBossHP(getState());

  if (alreadyAttack !== num && bossAlive) {
    dispatch(attackBoss(num));
  }
};

export const getSpecialItemOnce = (num) => (dispatch, getState) => {
  const canGetSpecialItem = selectSpecialItem(getState())[num];

  if (canGetSpecialItem) {
    dispatch(getSpecialItem(num));
  }
};

export const reachGoal = () => (dispatch, getState) => {
  const alreadyGetTrophy = selectGetTrophy(getState());

  if (!alreadyGetTrophy) {
    dispatch(getTrophy());
  }
};

export const applyStageResult = () => (dispatch, getState) => {
  const currentStage = selectCurrentStage(getState());
  const currentPoint = selectCurrentPoint(getState());
  const leftTime = selectLeftTime(getState());

  dispatch(setStageResult({ currentStage, currentPoint, leftTime }));
};

export const timeCountDown = () => (dispatch, getState) => {
  const leftTime = selectLeftTime(getState());

  if (leftTime > 0) {
    return dispatch(countDownLeftTime());
  }
  dispatch(collideMonster());
};

export const invisibleAllItems = () => (dispatch, getState) => {
  const currentStage = selectCurrentStage(getState());
  const itemKeys = Object.keys(selectMapState(getState())[currentStage].item);
  const specialItemKeys = Object.keys(
    selectMapState(getState())[currentStage].special,
  );

  dispatch(hideItems({ specialItemKeys, itemKeys }));
};

export const applyTranslateUpper = (height) => (dispatch, getState) => {
  const currentStage = selectCurrentStage(getState());
  const itemKeys = Object.keys(selectMapState(getState())[currentStage].item);
  const specialItemKeys = Object.keys(
    selectMapState(getState())[currentStage].special,
  );

  dispatch(
    translateItemsY({ specialItemKeys, itemKeys, height, currentStage }),
  );
};

export const applyTranslateRow = (width) => (dispatch, getState) => {
  const currentStage = selectCurrentStage(getState());
  const itemKeys = Object.keys(selectMapState(getState())[currentStage].item);
  const specialItemKeys = Object.keys(
    selectMapState(getState())[currentStage].special,
  );

  dispatch(translateItemsX({ specialItemKeys, itemKeys, width, currentStage }));
};

export default gameSlice.reducer;
