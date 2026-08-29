import { useState } from "react";
import type { MouseCordinate, ContainerCoordinate } from "../types/coordinate";
import { calculateClickedArea } from "../util/calculateClickArea";

const ZOOM = 2;

interface Prop {
  src: string;
  alt: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface OriginalCordinate {
  originalX: number;
  originalY: number;
}

export default function Magnifier({ src, alt, containerRef }: Prop) {
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
      2477, // get this from the backend later
      1440, // get this from the backend later
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
      className="relative overflow-hidden cursor-crosshair select-none min-w-full h-full max-w-xl"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full block object-fill"
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
