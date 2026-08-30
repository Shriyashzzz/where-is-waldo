import { useState } from "react";
import type { MouseCordinate, ContainerCoordinate } from "../types/coordinate";
import { calculateClickedArea } from "../util/calculateClickArea";
import type { OriginalCordinate } from "../pages/GamePlay";

const ZOOM = 2; // make this an state later

interface Prop {
  src: string;
  alt: string;
  originalImageProp: OriginalCordinate;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Magnifier({
  src,
  alt,
  containerRef,
  originalImageProp,
}: Prop) {
  const [visible, setVisible] = useState<boolean>(false);
  const [lensStyle, setLensStyle] = useState({});

  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const mouseCordinate: MouseCordinate = {
      X: e.clientX,
      Y: e.clientY,
    };

    const containerCordinate: ContainerCoordinate = {
      left: containerRef.current
        ? containerRef.current.getBoundingClientRect().left
        : null,
      top: containerRef.current
        ? containerRef.current.getBoundingClientRect().top
        : null,
      width: containerRef.current
        ? containerRef.current.getBoundingClientRect().width
        : null,
      height: containerRef.current
        ? containerRef.current.getBoundingClientRect().height
        : null,
    };

    if (!containerCordinate.left || !containerCordinate.top) return;

    const scaledCordinate: OriginalCordinate | undefined = calculateClickedArea(
      containerCordinate,
      mouseCordinate,
      originalImageProp.originalX,
      originalImageProp.originalY,
    );

    console.log(scaledCordinate);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;

      setLensStyle({
        left: `${x}px`,
        top: `${y}px`,
        backgroundImage: `url(${src})`,
        backgroundPosition: `${bgX}% ${bgY}%`,
        backgroundSize: `${rect.width * ZOOM}px ${rect.height * ZOOM}px`,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleMouseMove(e)
      }
      onClick={handleImageClick}
      className="relative overflow-hidden cursor-crosshair select-none min-w-fit h-full max-w-xl"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full block object-contain"
        draggable={false}
      />
      <div
        className={`absolute w-32 h-32 rounded-full border-4 border-white/80 shadow-lg
          pointer-events-none bg-no-repeat -translate-x-1/2 -translate-y-1/2
          ${visible ? "block" : "hidden"}`}
        style={lensStyle}
      />
    </div>
  );
}
