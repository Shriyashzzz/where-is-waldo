type Avatar = {
  [key: string]: boolean;
};

interface CharachterState {
  avatars: Avatar;
  found: (key: string) => void;
}

export const characterState: CharachterState = {
  avatars: {
    YellowWaldo: false,
    Dog: false,
    GirlWaldo: false,
    Waldo: false,
    GandalfWaldo: false,
  },
  found: (key: string) => {
    characterState.avatars[key] = true;
  },
};
