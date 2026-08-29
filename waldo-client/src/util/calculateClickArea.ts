import type { ContainerCoordinate, MouseCordinate } from "../types/coordinate";

export function calculateClickedArea(
  containerProp: ContainerCoordinate,
  mouseCordinate: MouseCordinate,
  imgWidth: number,
  imgHeight: number,
) {
  if (
    !containerProp.left ||
    !containerProp.top ||
    !mouseCordinate ||
    !containerProp.width ||
    !containerProp.height
  )
    return;
  const clickedCordinate = {
    x: mouseCordinate.X - containerProp.left,
    y: mouseCordinate.Y - containerProp.top,
  };

  const scaleX = imgWidth / containerProp.width;
  const scaleY = imgHeight / containerProp.height;

  return {
    originalX: clickedCordinate.x * scaleX,
    originalY: clickedCordinate.y * scaleY,
  };
}
