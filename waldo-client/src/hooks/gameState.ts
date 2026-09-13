import { create } from "zustand";

type GameState = {
  isAllFound: boolean;
  currGameIndex: number;
  isStart: boolean;
  updateState: (newState: {
    isAllFound?: boolean;
    currGameIndex?: number;
    isStart?: boolean;
  }) => void;
  resetState: () => void;
};

export const useGameState = create<GameState>()((set) => ({
  isAllFound: false,
  currGameIndex: -1,
  isStart: false,
  updateState: (newState) =>
    set((state) => {
      return { ...state, ...newState };
    }),
  resetState: () =>
    set(() => {
      return { isAllFound: false, currGameIndex: -1, isStart: false };
    }),
}));
