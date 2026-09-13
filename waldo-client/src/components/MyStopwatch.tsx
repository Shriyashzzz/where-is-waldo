import { useStopwatch } from "react-timer-hook";

export function MyStopwatch() {
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
  } = useStopwatch({ autoStart: true, interval: 20 });

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
