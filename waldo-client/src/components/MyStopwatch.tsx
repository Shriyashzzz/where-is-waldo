import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { useGameState } from "../hooks/gameState";

export function MyStopwatch() {
  const { isAllFound, gameIndex, isStart } = useGameState();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  useEffect(() => {
    if (isStart) {
      start();
    } else {
      pause();
    }
    if (isAllFound && !isStart) {
      setOpenDialog(true);
    }
  }, [isStart, isAllFound]);

  const {
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false, interval: 20 });

  const handleSendLeaderBoardScore = () => {};
  return (
    <div className="text-center h-fit  w-50 flex flex-col justify-center items">
      <div className="text-xl text-white highlight highlight-variant-8 highlight-green-500">
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>:<span>{milliseconds}</span>
      </div>

      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}

      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={() => reset()}>Reset</button> */}
    </div>
  );
}
