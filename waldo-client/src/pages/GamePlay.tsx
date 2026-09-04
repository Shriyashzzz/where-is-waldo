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
    <div className="flex flex-col items-center md:flex-row justify-center m-10">
      <section className="h-fit md:h-full w-full bg-inherit flex items-center justify-center">
        <ImageContainer containerRef={imgContainer} />
      </section>
      <SideCharachterWaldo />
    </div>
  );
}
