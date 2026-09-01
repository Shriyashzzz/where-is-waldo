import ImageContainer from "../components/GameImage.js";
import { useRef } from "react";
import { SideCharachterWaldo } from "../components/SideWaldoCharachter.js";

export interface OriginalCordinate {
  originalX: number;
  originalY: number;
}

export function PlayGame() {
  const imgContainer = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex items-center justify-center m-10">
      <section className="w-4/5 h-fit bg-inherit relative flex items-center justify-center">
        <ImageContainer containerRef={imgContainer} />
      </section>
      <SideCharachterWaldo />
    </div>
  );
}
