import ImageContainer from "../components/GameImage.js";
import { useEffect, useRef, useState } from "react";
import { SideCharachterWaldo } from "../components/SideWaldoCharachter.js";
import { Button } from "@radix-ui/themes";
import { ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";
import { Navigate, useParams } from "react-router";
import { MyStopwatch } from "../components/MyStopwatch.js";
import { useGameState } from "../hooks/gameState.js";
import { useCharacter } from "../hooks/store.js";

export interface OriginalCordinate {
  originalX: number;
  originalY: number;
}

export function PlayGame() {
  const { isStart, isAllFound, updateState, resetState } = useGameState();
  const { allCharacterFound } = useCharacter();
  const imgContainer = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [currentImgScale, setCurrentImageScale] = useState<number>(1);
  const { gameNumber } = useParams<string>();
  const gameIndex: number = Number(gameNumber); // corresponds to zustand store avatars state info index position for each game
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const handleZoomin = () => {
    setCurrentImageScale((s) => s * 2);
  };
  const handleZoomOut = () => {
    if (currentImgScale / 2 < 1) {
      setCurrentImageScale(1);
    } else {
      setCurrentImageScale((s) => s / 2);
    }
  };
  useEffect(() => {
    async function fetchFn() {
      const response = await fetch(`/api/games/${gameIndex}/gamestatus`);
      if (!response.ok) <Navigate to={"/error"} />;
      const data: { finished: boolean } = await response.json();
      if (data.finished) {
        allCharacterFound(gameIndex);
        updateState({
          isStart: false,
          isAllFound: true,
          currGameIndex: gameIndex,
        });
      }
    }
    fetchFn();
  }, []);

  useEffect(() => {
    if (!isStart && startTimer && !isAllFound) {
      updateState({
        isStart: true,
        isAllFound: false,
        currGameIndex: gameIndex,
      });
    }
    return () => resetState();
  }, [startTimer]);

  return (
    <div className="flex flex-col justify-center items-center p-2">
      <MyStopwatch />
      <div className="flex flex-col items-center lg:flex-row justify-center md:m-10 md:mt-1 ">
        <SideCharachterWaldo gameIndex={gameIndex} />
        <section
          className={`h-fit w-full bg-inherit flex items-center justify-center `}
          onClick={() => !startTimer && setStartTimer(true)}
        >
          <ImageContainer
            containerRef={imgContainer}
            imgRef={imgRef}
            currentImgScale={currentImgScale}
            gameIndex={gameIndex}
          />
        </section>

        <div className="flex flex-col gap-4 m-2 not-lg:flex-row ">
          <Button color={"tomato"} size={"3"} onClick={handleZoomin}>
            <ZoomInIcon />
          </Button>
          <Button color={"tomato"} size={"3"} onClick={handleZoomOut}>
            <ZoomOutIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
