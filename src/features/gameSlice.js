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
      state.hasCollideMonster = !state.hasCollideMonster;
    },
  },
});

export const { collideMonster } = gameSlice.actions;
export const selectCollideMonster = (state) => state.game.hasCollideMonster;

export default gameSlice.reducer;
