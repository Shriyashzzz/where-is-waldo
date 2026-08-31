import { useEffect, useState, useRef } from "react";
import type { MouseCordinate, ContainerCoordinate } from "../types/coordinate";
import { calculateClickedArea } from "../util/calculateClickArea";
import type { OriginalCordinate } from "../pages/GamePlay";
import { FoundAlert } from "./FoundAlert";
import waldoEasy from "../../public/assets/images/game/levels/easy.jpg";
import waldoMedium from "../../public/assets/images/game/levels/medium.jpg";
import waldoHard from "../../public/assets/images/game/levels/hard.jpg";
import waldoGodMode from "../../public/assets/images/game/levels/godMode.jpg";
import { useParams } from "react-router";

const ZOOM = 2; // make this an state later

interface Prop {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ImageContainer({ containerRef }: Prop) {
  const [visible, setVisible] = useState<boolean>(false);
  const [lensStyle, setLensStyle] = useState({});
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [gameImage, setGameImg] = useState<string>("");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const LENS_SIZE = 128; // to fit w-32, h-32 maginifying glass
  const [scaledCoordinate, setScaledCoordiane] = useState<
    OriginalCordinate | undefined
  >({ originalX: 0, originalY: 0 });
  const { gameNumber } = useParams<string>();
  useEffect(() => {
    switch (gameNumber) {
      case "1":
        setGameImg(waldoEasy);
        return;
      case "2":
        setGameImg(waldoMedium);
        return;
      case "3":
        setGameImg(waldoHard);
        return;
      case "4":
        setGameImg(waldoGodMode);
        return;
    }
  }, []);
  // handles imageclicks
  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
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

    if (!containerCordinate.left || !containerCordinate.top) return;
    if (!imgRef.current) return;

    const calculatedScaledCoordinate = calculateClickedArea(
      containerCordinate,
      mouseCordinate,
      imgRef.current.naturalWidth,
      imgRef.current.naturalHeight,
    );
    setScaledCoordiane(calculatedScaledCoordinate);
    setIsClicked(true);
  };
  // handles mouse move on maginifying glass
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLensStyle({
        left: `${x}px`,
        top: `${y}px`,
        backgroundImage: `url(${gameImage})`,
        backgroundSize: `${rect.width * ZOOM}px ${rect.height * ZOOM}px`,
        backgroundPosition: `${-(x * ZOOM - LENS_SIZE / 2)}px ${-(y * ZOOM - LENS_SIZE / 2)}px`,
      });
    }
  };
  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        !isClicked && handleMouseMove(e)
      }
      onClick={(e) => !isClicked && handleImageClick(e)}
      className="relative overflow-hidden cursor-crosshair select-none min-w-fit h-full max-w-xl"
    >
      {isClicked && (
        <FoundAlert
          isClicked={isClicked}
          setIsOpen={setIsClicked}
          scaledCoordinate={scaledCoordinate}
        />
      )}

      <img
        ref={imgRef}
        src={gameImage}
        className="w-full h-full block object-contain"
        draggable={false}
      />
      <div
        className={`absolute w-32 h-32 rounded-full border-4 border-white/80 shadow-lg
          pointer-events-none bg-no-repeat -translate-x-1/2 -translate-y-1/2
          ${visible && !isClicked ? "block" : "hidden"}`}
        style={lensStyle}
      />
    </div>
  );
}
