import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  hasCollideMonster: false,
  isGameRunning: true,
  crackEffect: false,
  currentPage: "MainPage",
  isModalVisible: false,
  runningGame: false,
  currentPoint: 0,
  getTrophy: false,
  hasClear: false,
  itemsVisible: {},
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    collideMonster: (state) => {
      state.hasCollideMonster = true;
      state.runningGame = false;
    },
    resetCollision: (state) => {
      state.hasCollideMonster = false;
      state.crackEffect = false;
      state.runningGame = true;
      state.isModalVisible = false;
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
      state.hasClear = true;
    },
    getItem: (state, action) => {
      state.itemsVisible[action.payload] = false;
      state.currentPoint += 100;
    },
    stageClear: (state) => {
      state.hasClear = true;
      state.runningGame = false;
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
  resetCollision,
  showModal,
  removeModal,
  getTrophy,
  setItemData,
  getItem,
  stageClear,
} = gameSlice.actions;

export const selectCollideMonster = (state) => state.game.hasCollideMonster;
export const selectCrackEffect = (state) => state.game.crackEffect;
export const selectPage = (state) => state.game.currentPage;
export const selectRunningGame = (state) => state.game.runningGame;
export const selectModalVisible = (state) => state.game.isModalVisible;
export const selectCurrentPoint = (state) => state.game.currentPoint;
export const selectGetTrophy = (state) => state.game.hasClear;
export const selectItemsVisible = (state) => state.game.itemsVisible;

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

export default gameSlice.reducer;
