import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasCollideMonster: false,
  isGameRunning: true,
  crackEffect: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    collideMonster: (state) => {
      state.hasCollideMonster = true;
    },
    resetCollision: (state) => {
      state.hasCollideMonster = false;
    },
    showCrackEffect: (state) => {
      state.crackEffect = true;
    },
  },
});

export const { collideMonster, showCrackEffect, resetCollision } =
  gameSlice.actions;
export const selectCollideMonster = (state) => state.game.hasCollideMonster;
export const selectCrackEffect = (state) => state.game.crackEffect;

export default gameSlice.reducer;
