import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasCollideMonster: false,
  isGameRunning: true,
  crackEffect: false,
  currentPage: "MainPage",
  isModalVisible: false,
  runningGame: false,
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
    },
    showCrackEffect: (state) => {
      state.crackEffect = true;
      state.isModalVisible = true;
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
    },
    showModal: (state) => {
      state.isModalVisible = true;
    },
    removeModal: (state) => {
      state.isModalVisible = false;
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
  removeModal
} = gameSlice.actions;

export const selectCollideMonster = (state) => state.game.hasCollideMonster;
export const selectCrackEffect = (state) => state.game.crackEffect;
export const selectPage = (state) => state.game.currentPage;
export const selectRunningGame = (state) => state.game.runningGame;
export const selectModalVisible = (state) => state.game.isModalVisible;

export default gameSlice.reducer;