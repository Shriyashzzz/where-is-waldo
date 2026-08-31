import ImageContainer from "../components/GameImage.js";
import { useRef, useState } from "react";
export interface OriginalCordinate {
  originalX: number;
  originalY: number;
}

export function PlayGame() {
  const imgContainer = useRef<HTMLDivElement | null>(null);
  const [originalImgProp, setOriginalImgProp] = useState<OriginalCordinate>({
    originalX: 1280,
    originalY: 864,
  });
  return (
    <section className="w-4/5 h-fit bg-inherit mt-3 relative flex items-center justify-center m-8">
      <ImageContainer
        containerRef={imgContainer}
        originalImageProp={originalImgProp}
      />
    </section>
  );
}
