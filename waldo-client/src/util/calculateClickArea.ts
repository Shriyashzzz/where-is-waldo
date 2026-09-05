import type { ContainerCoordinate, MouseCordinate } from "../types/coordinate";

export function calculateClickedArea(
  containerProp: ContainerCoordinate,
  mouseCordinate: MouseCordinate,
  imgWidth: number,
  imgHeight: number,
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

  const containerRatio = containerProp.width / containerProp.height;
  const imageRatio = imgWidth / imgHeight;

  let renderedWidth: number;
  let renderedHeight: number;

  if (imageRatio > containerRatio) {
    renderedWidth = containerProp.width;
    renderedHeight = containerProp.width / imageRatio;
  } else {
    renderedHeight = containerProp.height;
    renderedWidth = containerProp.height * imageRatio;
  }

  // no scale correction — origin-top-left keeps this offset fixed
  const offsetX = (containerProp.width - renderedWidth) / 2;
  const offsetY = (containerProp.height - renderedHeight) / 2;

  const scaledWidth = renderedWidth * scale;
  const scaledHeight = renderedHeight * scale;

  const clickedCordinate = {
    x: mouseCordinate.X - containerProp.left - offsetX + scrollLeft,
    y: mouseCordinate.Y - containerProp.top - offsetY + scrollTop,
  };

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
