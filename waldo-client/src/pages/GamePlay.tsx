import Magnifier from "../components/GameImage.js";
import WaldoImage from "../assets/images/easy.png"; // use the image fetched from the after backend is made
import { useRef } from "react";

export function PlayGame() {
  const imgContainer = useRef<HTMLDivElement | null>(null);

  return (
    <section className="w-4/5 h-4/5 bg-gray-100 mt-3 relative">
      {/* Fetch the image from the server*/}
      <Magnifier
        src={WaldoImage}
        alt="Waldo Game"
        containerRef={imgContainer}
      />
    </section>
  );
}
