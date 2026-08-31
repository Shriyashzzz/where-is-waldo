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

  // Figure out the actual rendered image box inside the container
  // (accounts for object-contain letterboxing)
  const containerRatio = containerProp.width / containerProp.height;
  const imageRatio = imgWidth / imgHeight;

  let renderedWidth: number;
  let renderedHeight: number;

  if (imageRatio > containerRatio) {
    // image is wider relative to container -> letterboxed top/bottom
    renderedWidth = containerProp.width;
    renderedHeight = containerProp.width / imageRatio;
  } else {
    // image is taller relative to container -> letterboxed left/right
    renderedHeight = containerProp.height;
    renderedWidth = containerProp.height * imageRatio;
  }

  const offsetX = (containerProp.width - renderedWidth) / 2;
  const offsetY = (containerProp.height - renderedHeight) / 2;

  const clickedCordinate = {
    x: mouseCordinate.X - containerProp.left - offsetX,
    y: mouseCordinate.Y - containerProp.top - offsetY,
  };

  // Optional: reject clicks that land in the letterbox margin
  if (
    clickedCordinate.x < 0 ||
    clickedCordinate.y < 0 ||
    clickedCordinate.x > renderedWidth ||
    clickedCordinate.y > renderedHeight
  ) {
    return;
  }

  const scaleX = imgWidth / renderedWidth;
  const scaleY = imgHeight / renderedHeight;

  return {
    originalX: clickedCordinate.x * scaleX,
    originalY: clickedCordinate.y * scaleY,
  };
}
