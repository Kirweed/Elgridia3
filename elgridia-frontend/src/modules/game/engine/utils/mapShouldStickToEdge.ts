export const mapEdgeToStick = (
  mapSize: number,
  playerPosition: number,
  canvasDimension: number,
) => {
  const endCheck = mapSize - playerPosition <= canvasDimension / 2;
  const startCheck = playerPosition <= canvasDimension / 2;
  const isBoth = endCheck && startCheck;
  if (endCheck && !isBoth) {
    return "end";
  }
  if (startCheck && !isBoth) {
    return "start";
  }
  return null;
};
