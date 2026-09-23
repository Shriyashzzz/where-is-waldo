import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState, type SetStateAction } from "react";
import type { OriginalCordinate } from "../pages/GamePlay";
import { CharachterAvatar } from "./CharachterAvatar";
import { useCharacter, type CharactersName } from "../hooks/store";
import { useNavigate } from "react-router";
import type { FoundCharahters } from "./GameImage";
import type { Coords } from "./GameImage";
import { useGameState } from "../hooks/gameState";
import { apiUrl } from "../util/api";

interface Props {
  scaledCoordinate: OriginalCordinate | undefined;
  isClicked: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gameIndex: number;
  setFoundCharachters: React.Dispatch<SetStateAction<FoundCharahters>>;
  currentClickedCoordinate: Coords;
}

interface Data {
  isCorrectCharacter: boolean;
  clickedX: number;
  clickedY: number;
  foundCharacter: CharactersName;
  allFound: boolean;
}

export function FoundAlert({
  scaledCoordinate,
  isClicked,
  setIsOpen,
  gameIndex,
  setFoundCharachters,
  currentClickedCoordinate,
}: Props) {
  const { updateState } = useGameState();
  const avatars = useCharacter((s) => s.avatars[gameIndex]);
  const setAvatar = useCharacter((s) => s.updateAvatar);
  const navigate = useNavigate();
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const allCharacterFound = useCharacter((s) => s.allCharacterFound);
  const handleCharachterClick = async (
    index: number,
    avatarName: CharactersName,
  ) => {
    if (avatars[index]?.found || pendingIndex !== null) return;

    setPendingIndex(index);
    try {
      const res = await fetch(apiUrl(`/api/games/${gameIndex}/click`), {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          character: avatarName,
          xCord: scaledCoordinate?.originalX,
          yCord: scaledCoordinate?.originalY,
        }),
      });
      if (res.status == 409) {
        updateState({ isAllFound: true });
        allCharacterFound(gameIndex);
        return;
      } else if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data: Data = await res.json();
      if (data.isCorrectCharacter) {
        const tempAvatar = [...avatars];
        tempAvatar[index].found = true;
        setAvatar(tempAvatar, gameIndex);
        setFoundCharachters((c) => {
          const tempArr = [...c];
          tempArr.push({
            xCord: currentClickedCoordinate.xCord,
            yCord: currentClickedCoordinate.yCord,
          });
          return tempArr;
        });

        if (data.allFound) {
          allCharacterFound(gameIndex);
          updateState({ justFinished: true });
          updateState({ isAllFound: true });
        }
        setIsOpen(false);
      }
    } catch (err) {
      console.log(err);
      navigate("/error");
    } finally {
      setPendingIndex(null);
    }
  };

  return (
    <AlertDialog.Root open={isClicked} onOpenChange={setIsOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Who did you find? </AlertDialog.Title>
        <div className="flex w-full h-fit justify-center items-center">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              onClick={() => handleCharachterClick(index, avatar.name)}
              style={{
                opacity:
                  pendingIndex !== null && pendingIndex !== index ? 0.5 : 1,
                pointerEvents: pendingIndex !== null ? "none" : "auto",
              }}
            >
              <CharachterAvatar avatarObj={avatar} name={avatar.name} />
            </div>
          ))}
        </div>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              onClick={() => setIsOpen(false)}
              style={{ cursor: "pointer" }}
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
