import { useEffect, useRef } from "react";
import styled from "styled-components";
import { maps } from "src/modules/game/engine/data/maps";
import { Loader } from "src/common/components";
import {
  TopCanvasOverlay,
  LeftGameSidebar,
  LocationInfoBar,
  RightGameSidebar,
} from "src/modules/game/components";
import gameManager from "src/modules/game/engine/GameManager/GameManager";
import { useSelector } from "react-redux";
import { AppRootState } from "src/store/store";

export const GameView = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const gameContainer = useRef<HTMLDivElement>(null);
  const { location, loading } = useSelector(
    (state: AppRootState) => state.game,
  );

  useEffect(() => {
    if (canvas.current && gameContainer.current) {
      gameManager.startGame({ canvas, gameContainer });
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Styled.GameContainer ref={gameContainer}>
        <TopCanvasOverlay />
        <LocationInfoBar
          x={location?.x}
          y={location?.y}
          name={maps.find(({ id }) => id === location.id)?.name}
        />
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
