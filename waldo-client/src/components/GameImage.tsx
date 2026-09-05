import { useEffect, useState, useRef } from "react";
import type { MouseCordinate, ContainerCoordinate } from "../types/coordinate";
import { calculateClickedArea } from "../util/calculateClickArea";
import type { OriginalCordinate } from "../pages/GamePlay";
import { FoundAlert } from "./FoundAlert";
import waldoEasy from "../../src/assets/images/game/levels/easy.jpg";
import waldoMedium from "../../src/assets/images/game/levels/medium.jpg";
import waldoHard from "../../src/assets/images/game/levels/hard.jpg";
import waldoGodMode from "../../src/assets/images/game/levels/godMode.jpg";
import { useParams } from "react-router";

const ZOOM = 2; // make this an state later

interface Prop {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  currentImgScale: number;
}

export default function ImageContainer({
  containerRef,
  imgRef,
  currentImgScale,
}: Prop) {
  const [visible, setVisible] = useState<boolean>(false);
  const [lensStyle, setLensStyle] = useState({});
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [gameImage, setGameImg] = useState<string>("");
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

    if (imgRef.current == null || containerRef.current == null) return;
    const calculatedScaledCoordinate = calculateClickedArea(
      containerCordinate,
      mouseCordinate,
      imgRef.current.naturalWidth,
      imgRef.current.naturalHeight,
      currentImgScale,
      containerRef.current.scrollLeft,
      containerRef.current.scrollTop,
    );
    setScaledCoordiane(calculatedScaledCoordinate);
    setIsClicked(true);
  };
  // handles mouse move on maginifying glass
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current || !imgRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const img = imgRef.current;

    // figure out image's rendered size inside the container (object-contain)
    const containerRatio = rect.width / rect.height;
    const imageRatio = img.naturalWidth / img.naturalHeight;

    let renderedWidth, renderedHeight;
    if (imageRatio > containerRatio) {
      renderedWidth = rect.width;
      renderedHeight = rect.width / imageRatio;
    } else {
      renderedHeight = rect.height;
      renderedWidth = rect.height * imageRatio;
    }

    // apply the currentImgScale (transform scales around center)
    const scaledWidth = renderedWidth * currentImgScale;
    const scaledHeight = renderedHeight * currentImgScale;
    const offsetX = (rect.width - scaledWidth) / 2;
    const offsetY = (rect.height - scaledHeight) / 2;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // position relative to the actual image content
    const imgX = x - offsetX + containerRef.current.scrollLeft;
    const imgY = y - offsetY + containerRef.current.scrollTop;

    setLensStyle({
      left: `${x}px`,
      top: `${y}px`,
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
      className="relative flex overflow-scroll justify-center flex-col items-center cursor-crosshair select-none h-fit md:h-full w-full"
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
        className={`max-w-full max-h-full block object-contain `}
        style={{ transform: `scale(${currentImgScale})` }}
        draggable={false}
      />
      <div
        className={`absolute w-32 h-32 rounded-full md:block hidden border-4 border-white/80 shadow-lg
          pointer-events-none bg-no-repeat -translate-x-1/2 -translate-y-1/2 not-md:hidden
          ${visible && !isClicked ? "block" : "hidden"}`}
        style={lensStyle}
      />
    </div>
  );
}
