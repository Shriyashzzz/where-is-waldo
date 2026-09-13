import { Flex, Button, AlertDialog } from "@radix-ui/themes";
import { Clock } from "lucide-react";
import { Label } from "radix-ui";
import { useRef } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gameIndex: number;
  time: string;
};

export function TimerDialog({ isOpen, setIsOpen, gameIndex, time }: Props) {
  const addScoreToLeaderBoard = () => {
    const name = document.getElementById("userName") as HTMLInputElement | null;
    name && console.log(name.value);
  };

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>
          Add your score to the leaderboard!
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          <span className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-xl highlight highlight-variant-18 highlight-sky-500 w-fit ">
              <Clock /> {time}{" "}
            </span>
            <span className="flex gap-2">
              <Label.Root
                className="text-xl font-medium leading-8.75 "
                htmlFor="userName"
              >
                Your Name
              </Label.Root>
              <input
                className="inline-flex appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-black focus:shadow-[0_0_0_2px_black]"
                type="text"
                id="userName"
              />
            </span>
          </span>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={() => addScoreToLeaderBoard()}
            >
              Add to LeaderBoard
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
