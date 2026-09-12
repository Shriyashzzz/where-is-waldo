import { create } from "zustand";
import WaldoAvatar1 from "../../src/assets/images/game/characters/waldo1.png";
import WaldoAvatar2 from "../../src/assets/images/game/characters/waldo2.png";
import WaldoAvatar3 from "../../src/assets/images/game/characters/waldo3.png";
import WaldoAvatar4 from "../../src/assets/images/game/characters/waldo4.png";
import WaldoAvatar5 from "../../src/assets/images/game/characters/waldo5.png";

export type CharactersName =
  | "YellowWaldo"
  | "Dog"
  | "GirlWaldo"
  | "Waldo"
  | "GandalfWaldo";

interface Avatar {
  img: string;
  found: boolean;
  name: CharactersName;
}

export interface CharacterStore {
  avatars: Array<Array<Avatar>>;
  updateAvatar: (newAvatar: Avatar[], index: number) => void;
}

export const useCharacter = create<CharacterStore>()((set) => ({
  avatars: [
    [
      { img: WaldoAvatar1, name: "YellowWaldo", found: false },
      { img: WaldoAvatar2, name: "Dog", found: false },
      { img: WaldoAvatar3, name: "Waldo", found: false },
      { img: WaldoAvatar4, name: "GirlWaldo", found: false },
      { img: WaldoAvatar5, name: "GandalfWaldo", found: false },
    ],
    [
      { img: WaldoAvatar1, name: "YellowWaldo", found: false },
      { img: WaldoAvatar2, name: "Dog", found: false },
      { img: WaldoAvatar3, name: "Waldo", found: false },
      { img: WaldoAvatar4, name: "GirlWaldo", found: false },
      { img: WaldoAvatar5, name: "GandalfWaldo", found: false },
    ],
    [
      { img: WaldoAvatar1, name: "YellowWaldo", found: false },
      { img: WaldoAvatar2, name: "Dog", found: false },
      { img: WaldoAvatar3, name: "Waldo", found: false },
      { img: WaldoAvatar4, name: "GirlWaldo", found: false },
      { img: WaldoAvatar5, name: "GandalfWaldo", found: false },
    ],
    [
      { img: WaldoAvatar1, name: "YellowWaldo", found: false },
      { img: WaldoAvatar2, name: "Dog", found: false },
      { img: WaldoAvatar3, name: "Waldo", found: false },
      { img: WaldoAvatar4, name: "GirlWaldo", found: false },
      { img: WaldoAvatar5, name: "GandalfWaldo", found: false },
    ],
  ],
  updateAvatar: (newAvatars, index) =>
    set((state) => {
      const updated = [...state.avatars];
      updated[index] = newAvatars;
      return { avatars: updated };
    }),
}));
