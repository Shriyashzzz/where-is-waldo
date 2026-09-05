import type { ContainerCoordinate, MouseCordinate } from "../types/coordinate";
export function calculateClickedArea(
  containerProp: ContainerCoordinate,
  mouseCordinate: MouseCordinate,
  imgWidth: number,
  imgHeight: number,
  scale: number, // currentImgScale
  scrollLeft: number, // containerRef.current.scrollLeft
  scrollTop: number, // containerRef.current.scrollTop
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

  // actual rendered size after CSS transform scale
  const scaledWidth = renderedWidth * scale;
  const scaledHeight = renderedHeight * scale;

  // transform-origin is center, so the scaled box expands
  // outward equally from the unscaled box's center
  const baseOffsetX = (containerProp.width - renderedWidth) / 2;
  const baseOffsetY = (containerProp.height - renderedHeight) / 2;
  const offsetX = baseOffsetX - (scaledWidth - renderedWidth) / 2;
  const offsetY = baseOffsetY - (scaledHeight - renderedHeight) / 2;

  // position relative to the container's content box, including scroll
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
