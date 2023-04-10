import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasCollideMonster: false,
  isGameRunning: true,
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
    }
  },
});

export const { collideMonster, resetCollision } = gameSlice.actions;
export const selectCollideMonster = (state) => state.game.hasCollideMonster;

export default gameSlice.reducer;
