import ImageContainer from "../components/GameImage.js";
import { useRef, useState } from "react";
import { SideCharachterWaldo } from "../components/SideWaldoCharachter.js";
import { Button } from "@radix-ui/themes";
import { ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router";

export interface OriginalCordinate {
  originalX: number;
  originalY: number;
}

export function PlayGame() {
  const imgContainer = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [currentImgScale, setCurrentImageScale] = useState<number>(1);
  const { gameNumber } = useParams<string>();
  const gameIndex: number = Number(gameNumber); // corresponds to zustand store avatars state info index position for each game

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

  return (
    <div className="flex flex-col items-center md:flex-row justify-center md:m-10">
      <SideCharachterWaldo gameIndex={gameIndex} />
      <section className="h-fit w-full bg-inherit flex items-center justify-center">
        <ImageContainer
          containerRef={imgContainer}
          imgRef={imgRef}
          currentImgScale={currentImgScale}
          gameIndex={gameIndex}
        />
      </section>

      <div className="flex flex-col gap-4 m-2 not-md:flex-row">
        <Button color={"tomato"} size={"3"} onClick={handleZoomin}>
          <ZoomInIcon />
        </Button>
        <Button color={"tomato"} size={"3"} onClick={handleZoomOut}>
          <ZoomOutIcon />
        </Button>
      </div>
    </div>
  );
}
