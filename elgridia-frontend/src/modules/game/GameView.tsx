import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { maps } from "src/maps";
import { Loader } from "src/common/components";
import {
  TopCanvasOverlay,
  LeftGameSidebar,
  LocationInfoBar,
  RightGameSidebar,
} from "src/modules/game/components";
import { Overworld, OverworldMap, Player } from "src/modules/game/engine";
import CharacterImage from "src/assets/sprites/woj1.png";
import { useUserBaseInfo, useUserLocation } from "src/common/hooks";
import { useUpdatePlayerLocation } from "src/modules/game/hooks";

export const GameView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState<Player>();
  const [currentMap, setCurrentMap] = useState<OverworldMap>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const gameContainer = useRef<HTMLDivElement>(null);
  const location = useUserLocation();
  const baseInfo = useUserBaseInfo();
  const updatePlayerLocation = useUpdatePlayerLocation(currentMap?.id);

  useEffect(() => {
    if (!player && location && currentMap && baseInfo) {
      const { x, y } = location;
      const hero = new Player({
        x: x * 32,
        y: y * 32,
        src: CharacterImage,
        frameSpeed: baseInfo.frameSpeed,
        updatePlayerLocation,
      });
      setPlayer(hero);
    }
  }, [location, player, updatePlayerLocation, currentMap, baseInfo]);

  useEffect(() => {
    if (!currentMap && location) {
      const { id } = location;
      const foundedMap = maps.find(({ id: mapId }) => mapId === id);
      if (foundedMap) {
        const map = new OverworldMap({
          src: foundedMap.img,
          id: foundedMap.id,
          name: foundedMap.name,
        });
        setCurrentMap(map);
      }
    }
  }, [location, currentMap]);

  useEffect(() => {
    if (canvas && player && currentMap) {
      const overworld = new Overworld({
        canvas,
        gameContainer,
        setIsLoading,
        player,
        map: currentMap,
      });
      overworld.init();
    }
  }, [canvas, player, currentMap]);

  return (
    <>
      {isLoading && <Loader />}
      <Styled.GameContainer ref={gameContainer}>
        <TopCanvasOverlay />
        <LocationInfoBar
          x={location?.x}
          y={location?.y}
          name={currentMap?.name}
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
