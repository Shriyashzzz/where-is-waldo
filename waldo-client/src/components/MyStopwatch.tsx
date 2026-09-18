import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { useGameState } from "../hooks/gameState";
import { TimerDialog } from "./TImerDialog";

export function MyStopwatch() {
  const { currGameIndex, isStart, justFinished } = useGameState();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    if (isStart) {
      start();
    }
  }, [isStart]);

  useEffect(() => {
    if (justFinished) {
      pause();
      const time: string = `${hours}:${minutes}:${seconds}:${milliseconds}`;
      setTime(time);
      setOpenDialog(true);
    }
    return () => {
      reset(undefined, false);
    };
  }, [justFinished]);

  const { milliseconds, seconds, minutes, hours, days, start, pause, reset } =
    useStopwatch({ autoStart: false, interval: 20 });

  return (
    <div className="text-center h-fit  w-50 flex flex-col justify-center items">
      <div className="text-xl text-white highlight highlight-variant-8 highlight-green-500">
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>:<span>{milliseconds}</span>
      </div>
      <TimerDialog
        isOpen={openDialog}
        time={time}
        setIsOpen={setOpenDialog}
        gameIndex={currGameIndex}
      />
    </div>
  );
}
