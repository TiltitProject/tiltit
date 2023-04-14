import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasCollideMonster: false,
  isGameRunning: true,
  crackEffect: false,
  currentPage: "MainPage",
  isModalVisible: false,
  runningGame: false,
  currentPoint: 0,
  hasClear: false,
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
    runGame: (state) => {
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
    clearStage: (state) => {
      state.hasClear = true;
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
  resetCollision,
  showModal,
  removeModal,
  clearStage,
} = gameSlice.actions;

export const selectCollideMonster = (state) => state.game.hasCollideMonster;
export const selectCrackEffect = (state) => state.game.crackEffect;
export const selectPage = (state) => state.game.currentPage;
export const selectRunningGame = (state) => state.game.runningGame;
export const selectModalVisible = (state) => state.game.isModalVisible;
export const selectCurrentPoint = (state) => state.game.currentPoint;
export const selectHasClear = (state) => state.game.hasClear;

export default gameSlice.reducer;
