type CharactersName =
  | "YellowWaldo"
  | "Dog"
  | "GirlWaldo"
  | "Waldo"
  | "GandalfWaldo";

interface CharactersState {
  avatars: Array<Record<CharactersName, boolean>>;
  found: (index: number, key: CharactersName) => void;
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
    if (!avatar) throw new Error(`Invalid Index value, passed index: ${index}`);
    avatar[key] = true;
  },
};
