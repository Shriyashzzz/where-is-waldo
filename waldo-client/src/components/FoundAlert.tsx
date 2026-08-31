import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import type { OriginalCordinate } from "../pages/GamePlay";
import { CharachterAvatar } from "./CharachterAvatar";
import WaldoAvatar1 from "../../public/assets/images/game/characters/waldo1.png";
import WaldoAvatar2 from "../../public/assets/images/game/characters/waldo2.png";
import WaldoAvatar3 from "../../public/assets/images/game/characters/waldo3.png";
import WaldoAvatar4 from "../../public/assets/images/game/characters/waldo4.png";
import WaldoAvatar5 from "../../public/assets/images/game/characters/waldo5.png";
import { useState } from "react";

interface Props {
  scaledCoordinate: OriginalCordinate | undefined;
  isClicked: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FoundAlert({ scaledCoordinate, isClicked, setIsOpen }: Props) {
  const [avatars, setAvatars] = useState([
    { img: WaldoAvatar1, found: false },
    { img: WaldoAvatar2, found: false },
    { img: WaldoAvatar3, found: false },
    { img: WaldoAvatar4, found: false },
    { img: WaldoAvatar5, found: false },
    ,
  ]);
  const handleCharachterClick = (index: number) => {
    if (avatars[index]?.found) return;
    console.log(scaledCoordinate); // send this scaled cordinate to server for checks together with the charachter selected
    console.log(index);
  };
  return (
    <AlertDialog.Root open={isClicked}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Who did you find? </AlertDialog.Title>
        <div className="flex w-full h-fit justify-center items-center">
          {avatars.map((avatar, index) => {
            return (
              <div key={index} onClick={() => handleCharachterClick(index)}>
                <CharachterAvatar avatarObj={avatar} name="Waldo" />
              </div>
            );
          })}
        </div>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              onClick={() => setIsOpen(false)}
              variant="soft"
              color="gray"
            >
              Nevermind...
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
