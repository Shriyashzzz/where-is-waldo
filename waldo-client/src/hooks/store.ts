import { create } from "zustand";
import WaldoAvatar1 from "../../src/assets/images/game/characters/waldo1.png";
import WaldoAvatar2 from "../../src/assets/images/game/characters/waldo2.png";
import WaldoAvatar3 from "../../src/assets/images/game/characters/waldo3.png";
import WaldoAvatar4 from "../../src/assets/images/game/characters/waldo4.png";
import WaldoAvatar5 from "../../src/assets/images/game/characters/waldo5.png";

interface Avatar {
  img: string;
  found: boolean;
}

export interface CharacterStore {
  avatars: Array<Avatar>;
  updateAvatar: (newAvatar: Avatar[]) => void;
}

export const useCharacter = create<CharacterStore>()((set) => ({
  avatars: [
    { img: WaldoAvatar1, found: false },
    { img: WaldoAvatar2, found: false },
    { img: WaldoAvatar3, found: false },
    { img: WaldoAvatar4, found: false },
    { img: WaldoAvatar5, found: false },
  ],
  updateAvatar: (newAvatars) => set({ avatars: newAvatars }),
}));
