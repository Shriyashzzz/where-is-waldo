import { AsyncLocalStorage } from "node:async_hooks";

type CharactersName =
  | "YellowWaldo"
  | "Dog"
  | "GirlWaldo"
  | "Waldo"
  | "GandalfWaldo";
export type GameAvatars = Array<Record<CharactersName, boolean>>;

export const createInitialAvatars = (): GameAvatars =>
  Array.from({ length: 4 }, () => ({
    YellowWaldo: false,
    Dog: false,
    GirlWaldo: false,
    Waldo: false,
    GandalfWaldo: false,
  }));

const als = new AsyncLocalStorage<GameAvatars>();

let fallback: GameAvatars = createInitialAvatars();

function getState(): GameAvatars {
  return als.getStore() ?? fallback;
}

export const charactersStore = {
  runInSession<T>(avatars: GameAvatars, fn: () => T): T {
    return als.run(avatars, fn);
  },

  found: (index: number, key: CharactersName) => {
    const avatar = getState()[index];
    if (!avatar) throw new Error(`Invalid Index value ${index}`);
    avatar[key] = true;
  },

  getLength: () => getState().length,

  isAllFound: (gameIndex: number) => {
    const avatar = getState()[gameIndex];
    if (!avatar) throw new Error(`Invalid Index value ${gameIndex}`);
    return Object.values(avatar).every(Boolean);
  },

  setAllFound: (gameIndex: number) => {
    const state = getState();
    if (state[gameIndex]) {
      state[gameIndex] = {
        YellowWaldo: true,
        Dog: true,
        GirlWaldo: true,
        Waldo: true,
        GandalfWaldo: true,
      };
    }
  },

  reset: (): boolean => {
    try {
      const state = getState();
      const fresh = createInitialAvatars();
      state.length = 0;
      state.push(...fresh);
      fallback = createInitialAvatars();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
