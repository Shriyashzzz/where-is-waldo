type CharacterName =
  | "YellowWaldo"
  | "Dog"
  | "GirlWaldo"
  | "Waldo"
  | "GandalfWaldo";

interface CharacterState {
  avatars: Array<Record<CharacterName, boolean>>;
  found: (index: number, key: CharacterName) => void;
}

export const characterState: CharacterState = {
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
  found: (index: number, key: CharacterName) => {
    const avatar = characterState.avatars[index];
    if (!avatar) throw new Error(`Invalid Index value, passed index: ${index}`);
    avatar[key] = true;
  },
};
