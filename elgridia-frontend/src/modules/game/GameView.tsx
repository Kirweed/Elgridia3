import { useEffect, useRef } from "react";
import {
  TopCanvasOverlay,
  LeftGameSidebar,
  LocationInfoBar,
  RightGameSidebar,
} from "src/modules/game/components";
import { Overworld } from "src/modules/game/engine";
import styled from "styled-components";

export const GameView = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const gameContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overworld = new Overworld({ canvas, gameContainer });
    overworld.init();
  }, [canvas]);

  return (
    <>
      <Styled.GameContainer ref={gameContainer}>
        <TopCanvasOverlay />
        <LocationInfoBar x={0} y={0} />
        <LeftGameSidebar />
        <Styled.GameCanvas width="1024" height="512" ref={canvas} />
        <RightGameSidebar />
      </Styled.GameContainer>
    </>
  );
};

const Styled = {
  GameContainer: styled.main`
    position: relative;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    display: flex;
  `,

  GameCanvas: styled.canvas`
    display: block;
    background-color: #222;
    image-rendering: pixelated;
  `,
};
