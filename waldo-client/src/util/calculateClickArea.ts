import type { ContainerCoordinate, MouseCordinate } from "../types/coordinate";

export function calculateClickedArea(
  containerProp: ContainerCoordinate,
  mouseCordinate: MouseCordinate,
  imgWidth: number, // naturalWidth — used for the final ratio conversion
  imgHeight: number, // naturalHeight
  renderedWidth: number, // img.offsetWidth — actual unscaled layout size
  renderedHeight: number, // img.offsetHeight
  scale: number,
  scrollLeft: number,
  scrollTop: number,
) {
  if (
    containerProp.left == null ||
    containerProp.top == null ||
    !mouseCordinate ||
    !containerProp.width ||
    !containerProp.height
  )
    return;

  // base offset from wherever the browser actually placed the image
  // (object-contain, max-h-[80vh], or anything else — doesn't matter,
  // offsetWidth/offsetHeight already reflects the real answer)
  const offsetX = (containerProp.width - renderedWidth) / 2;
  const offsetY = (containerProp.height - renderedHeight) / 2;

  const scaledWidth = renderedWidth * scale;
  const scaledHeight = renderedHeight * scale;

  const clickedCordinate = {
    x: mouseCordinate.X - containerProp.left - offsetX + scrollLeft,
    y: mouseCordinate.Y - containerProp.top - offsetY + scrollTop,
  };

  // reject clicks that land in the letterbox margin
  if (
    clickedCordinate.x < 0 ||
    clickedCordinate.y < 0 ||
    clickedCordinate.x > scaledWidth ||
    clickedCordinate.y > scaledHeight
  ) {
    return;
  }

  const scaleX = imgWidth / scaledWidth;
  const scaleY = imgHeight / scaledHeight;

  return {
    originalX: clickedCordinate.x * scaleX,
    originalY: clickedCordinate.y * scaleY,
  };
}
