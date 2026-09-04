import ImageContainer from "../components/GameImage.js";
import { useRef, useState } from "react";
import { SideCharachterWaldo } from "../components/SideWaldoCharachter.js";
import { Button } from "@radix-ui/themes";

export interface OriginalCordinate {
  originalX: number;
  originalY: number;
}

export function PlayGame() {
  const imgContainer = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [currentImgScale, setCurrentImageScale] = useState<number>(1);
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
      <section className="h-fit md:h-full w-full bg-inherit flex items-center justify-center">
        <ImageContainer
          containerRef={imgContainer}
          imgRef={imgRef}
          currentImgScale={currentImgScale}
        />
      </section>

      <div>
        <Button onClick={handleZoomin}>Zoom in</Button>
        <Button onClick={handleZoomOut}>Zoom out</Button>
      </div>
      <SideCharachterWaldo />
    </div>
  );
}
