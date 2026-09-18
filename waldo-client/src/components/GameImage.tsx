import { useEffect, useState } from "react";
import type { MouseCordinate, ContainerCoordinate } from "../types/coordinate";
import { calculateClickedArea } from "../util/calculateClickArea";
import type { OriginalCordinate } from "../pages/GamePlay";
import { FoundAlert } from "./FoundAlert";
import waldoEasy from "../../src/assets/images/game/levels/easy.jpg";
import waldoMedium from "../../src/assets/images/game/levels/medium.jpg";
import waldoHard from "../../src/assets/images/game/levels/hard.jpg";
import waldoGodMode from "../../src/assets/images/game/levels/godMode.jpg";
import { Check } from "lucide-react";
import { useGameState } from "../hooks/gameState";
import { SideCharachterWaldo } from "./SideWaldoCharachter";

const ZOOM = 2; // make this an state later

interface Prop {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  currentImgScale: number;
  gameIndex: number;
}

export type Coords = { xCord: number; yCord: number };
export type FoundCharahters = Array<Coords>;

export default function ImageContainer({
  containerRef,
  imgRef,
  currentImgScale,
  gameIndex,
}: Prop) {
  const [visible, setVisible] = useState<boolean>(false);
  const [lensStyle, setLensStyle] = useState({});
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [gameImage, setGameImg] = useState<string | null>(null);
  const LENS_SIZE = 128; // to fit w-32, h-32 maginifying glass
  const [scaledCoordinate, setScaledCoordiane] = useState<
    OriginalCordinate | undefined
  >({ originalX: 0, originalY: 0 });
  const [originalCoordinate, setOriginalCoordinate] = useState<Coords>({
    xCord: 0,
    yCord: 0,
  });
  const isAllFound = useGameState((s) => s.isAllFound);
  const [foundCharachters, setFoundCharachters] = useState<FoundCharahters>([]);
  useEffect(() => {
    switch (gameIndex) {
      case 0:
        setGameImg(waldoEasy);
        return;
      case 1:
        setGameImg(waldoMedium);
        return;
      case 2:
        setGameImg(waldoHard);
        return;
      case 3:
        setGameImg(waldoGodMode);
        return;
    }
  }, []);
  // handles imageclicks
  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isAllFound) return;
    const mouseCordinate: MouseCordinate = {
      X: e.clientX,
      Y: e.clientY,
    };
    const containerCordinate: ContainerCoordinate = {
      left: containerRef.current?.getBoundingClientRect().left ?? null,
      top: containerRef.current?.getBoundingClientRect().top ?? null,
      width: containerRef.current?.getBoundingClientRect().width ?? null,
      height: containerRef.current?.getBoundingClientRect().height ?? null,
    };

    if (imgRef.current == null || containerRef.current == null) return;
    const calculatedScaledCoordinate = calculateClickedArea(
      containerCordinate,
      mouseCordinate,
      imgRef.current.naturalWidth,
      imgRef.current.naturalHeight,
      imgRef.current.offsetWidth,
      imgRef.current.offsetHeight,
      currentImgScale,
      containerRef.current.scrollLeft,
      containerRef.current.scrollTop,
    );
    if (!calculatedScaledCoordinate) return;
    setScaledCoordiane(calculatedScaledCoordinate);
    setOriginalCoordinate({
      xCord: calculatedScaledCoordinate.originalX,
      yCord: calculatedScaledCoordinate.originalY,
    });
    setIsClicked(true);
  };
  // handles mouse move on maginifying glass
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current || !imgRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const img = imgRef.current;

    // read the actual unscaled layout size directly — correct no matter
    // which CSS rule ends up binding (max-w, max-h-[80vh], etc.)
    const renderedWidth = img.offsetWidth;
    const renderedHeight = img.offsetHeight;

    // origin-top-left: this corner stays fixed under scaling, no correction needed
    const offsetX = (rect.width - renderedWidth) / 2;
    const offsetY = (rect.height - renderedHeight) / 2;

    const scaledWidth = renderedWidth * currentImgScale;
    const scaledHeight = renderedHeight * currentImgScale;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imgX = x - offsetX + containerRef.current.scrollLeft;
    const imgY = y - offsetY + containerRef.current.scrollTop;

    setLensStyle({
      left: `${imgX}px`,
      top: `${imgY}px`,
      backgroundImage: `url(${gameImage})`,
      backgroundSize: `${scaledWidth * ZOOM}px ${scaledHeight * ZOOM}px`,
      backgroundPosition: `${-(imgX * ZOOM - LENS_SIZE / 2)}px ${-(imgY * ZOOM - LENS_SIZE / 2)}px`,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        !isClicked && handleMouseMove(e)
      }
      onClick={(e) => {
        !isClicked && handleImageClick(e);
      }}
      className="relative flex overflow-scroll justify-center flex-col items-center cursor-crosshair select-none h-fit md:h-full w-full "
    >
      {isClicked && (
        <FoundAlert
          isClicked={isClicked}
          setIsOpen={setIsClicked}
          scaledCoordinate={scaledCoordinate}
          gameIndex={gameIndex}
          setFoundCharachters={setFoundCharachters}
          currentClickedCoordinate={originalCoordinate}
        />
      )}

      <div
        className={`relative inline-block origin-top-left `}
        style={{ transform: `scale(${currentImgScale})` }}
      >
        <div
          className={`${isAllFound && "relative highlight highlight-variant-2 highlight-red-700 after:z-10 after:pointer-events-none"}`}
        >
          {gameImage && (
            <img
              ref={imgRef}
              src={gameImage}
              className="relative z-0 max-w-full max-h-[80vh] block object-contain origin-top-left"
              draggable={false}
            />
          )}

          {isAllFound && (
            <div className="absolute inset-0 flex-col z-20 flex items-center justify-center pointer-events-none">
              <span className="highlight highlight-variant-2  highlight-red-700 text-4xl md:text-5xl font-bold text-white px-2">
                Game over
              </span>

              <SideCharachterWaldo
                gameIndex={gameIndex}
                orientation={"flex-row"}
                noChange={true}
              />
            </div>
          )}
        </div>

        {!isAllFound &&
          foundCharachters.map((arr) => {
            if (!imgRef.current) return null;
            const leftPct = (arr.xCord / imgRef.current.naturalWidth) * 100;
            const topPct = (arr.yCord / imgRef.current.naturalHeight) * 100;

            return (
              <div
                key={`${arr.xCord}-${arr.yCord}`}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center sm:size-5 size-2  highlight highlight-variant-3 highlight-sky-600  pointer-events-none"
              >
                <Check className="size-4 text-white" strokeWidth={4} />
              </div>
            );
          })}
      </div>
      <div
        className={`absolute w-32 h-32 rounded-full border-4 border-white/80 shadow-lg
            pointer-events-none bg-no-repeat -translate-x-1/2 -translate-y-1/2 not-md:hidden 
            ${visible && !isClicked && !isAllFound ? "block" : "hidden"} 
            `}
        style={lensStyle}
      />
    </div>
  );
}
