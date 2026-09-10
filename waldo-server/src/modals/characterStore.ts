type CharactersName =
  | "YellowWaldo"
  | "Dog"
  | "GirlWaldo"
  | "Waldo"
  | "GandalfWaldo";

interface CharactersState {
  avatars: Array<Record<CharactersName, boolean>>;
  found: (index: number, key: CharactersName) => void;
  getLength: () => number;
  isAllFound: (gameIndex: number) => boolean;
}

export const charactersStore: CharactersState = {
  avatars: [
    {
      YellowWaldo: false,
      Dog: false,
      GirlWaldo: false,
      Waldo: false,
      GandalfWaldo: false,
    },
    {
      YellowWaldo: false,
      Dog: false,
      GirlWaldo: false,
      Waldo: false,
      GandalfWaldo: false,
    },
    {
      YellowWaldo: false,
      Dog: false,
      GirlWaldo: false,
      Waldo: false,
      GandalfWaldo: false,
    },
    {
      YellowWaldo: false,
      Dog: false,
      GirlWaldo: false,
      Waldo: false,
      GandalfWaldo: false,
    },
  ],
  found: (index: number, key: CharactersName) => {
    const avatar = charactersStore.avatars[index];
    if (!avatar)
      throw new Error(
        `Invalid Index value, passed by the controller/checkIfValidCoordinate module, givenIndexValue ${index}`,
      );
    avatar[key] = true;
  },
  getLength: () => {
    return charactersStore.avatars.length;
  },

  isAllFound: (gameIndex: number) => {
    const avatar = charactersStore.avatars[gameIndex];
    if (!avatar)
      throw new Error(
        `Invalid Index value, passed by the controller/checkIfValidCoordinate module, givenIndexValue ${gameIndex}`,
      );
    const allFound: boolean = Object.values(avatar).every(Boolean);
    return allFound;
  },
};
