import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import type { OriginalCordinate } from "../pages/GamePlay";
import { CharachterAvatar } from "./CharachterAvatar";
import { useCharacter } from "../hooks/store";

interface Props {
  scaledCoordinate: OriginalCordinate | undefined;
  isClicked: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FoundAlert({ scaledCoordinate, isClicked, setIsOpen }: Props) {
  const avatars = useCharacter((s) => s.avatars); //zustand store
  const setAvatar = useCharacter((s) => s.updateAvatar);
  const handleCharachterClick = (index: number) => {
    if (avatars[index]?.found) return;
    console.log(scaledCoordinate); // send this scaled cordinate to server for checks together with the charachter selected
    console.log(index);
    //get the response from the server
    //imagining the charchter clicked is teh correct charachter
    const tempAvatar = [...avatars];
    tempAvatar[index].found = true;
    setAvatar(tempAvatar);
    //ensure to show loading when fetching disable when true, maybe use redux state management for counter
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
