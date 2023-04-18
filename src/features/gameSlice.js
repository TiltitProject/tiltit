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
  mapInfo: null,
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
    },
    showCrackEffect: (state) => {
      state.crackEffect = true;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    runGame: (state, action) => {
      const items = {};

      Array.from(Array(action.payload).keys()).forEach((num) => {
        items[num + 1] = true;
      });

      state.itemsVisible = items;
      state.runningGame = true;
      state.getTrophy = false;
      state.hasClear = false;
      state.leftTime = 30;
    },
    stopGame: (state) => {
      state.runningGame = false;
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
      state.mapInfo = action.payload;
    },
    downItemPosition: (state, action) => {
      const itemKeys = action.payload;
      itemKeys.forEach((num) => {
        state.mapInfo.item[num].position.y += 10;
      });
    }
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
  downItemPosition
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
export const selectMapInfo = (state) => state.game.mapInfo;

export const getItemOnce = (num) => (dispatch, getState) => {
  const canGetItem = selectItemsVisible(getState())[num];

  if (canGetItem) {
    dispatch(getItem(num));
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

export const translateUpper = () => (dispatch, getState) => {
  const itemKeys = Object.keys(selectMapInfo(getState()).item);
  dispatch(downItemPosition(itemKeys));
};

export default gameSlice.reducer;
