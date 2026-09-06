interface Coordinate {
  x_cord: number;
  y_cord: number;
}

export const isWithInBounds = (
  originalCord: Coordinate,
  clickedCord: Coordinate,
) => {
  const x_diff = Math.abs(originalCord.x_cord - clickedCord.x_cord);
  const y_diff = Math.abs(originalCord.y_cord - clickedCord.y_cord);

  if (x_diff < 25 && y_diff < 25) return true;
  return false;
};
