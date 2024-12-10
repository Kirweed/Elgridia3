import styled from "styled-components";
import { Flex, Heading } from "src/common/components";
import { Button } from "src/common/components/Button/Button";
import { useAuth } from "src/modules/auth/hooks";
import userOutfit from "src/assets/sprites/woj1.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { routes } from "src/routes";
import { SimpleSprite } from "src/modules/game/engine/SimpleSprite";
import { useUserBaseInfo } from "src/common/hooks/useUserBaseInfo";

export const LobbyView = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const canvas = useRef<HTMLCanvasElement>(null);
  const { nick, level } = useUserBaseInfo();

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        const sprite = new SimpleSprite({ src: userOutfit });
        sprite.setAnimation("walk-down");
        const canvasLoop = () => {
          if (!canvas.current) return;
          ctx.clearRect(0, 0, canvas.current?.width, canvas.current?.height);
          sprite?.draw(ctx);
          requestAnimationFrame(canvasLoop);
        };
        canvasLoop();
      }
    }
  }, [canvas]);

  return (
    <Flex direction="column" gap={40} style={{ marginTop: "40px" }}>
      <Heading level="h1" fantasy>
        Twój bohater:
      </Heading>
      <Styled.Container>
        <Flex gap={16} direction="column" align="flex-start" width="100%">
          <Flex justify="space-between" width="100%">
            <Styled.Label>Nazwa:</Styled.Label>
            <Heading level="h3">{nick}</Heading>
          </Flex>
          <Flex justify="space-between" width="100%">
            <Styled.Label>Poziom:</Styled.Label>
            <Heading level="h3">{level}</Heading>
          </Flex>
        </Flex>

        <Styled.OutfitCanvas width="32" height="48" ref={canvas} />
      </Styled.Container>
      <Flex gap={50}>
        <Button variant="primary" onClick={() => navigate(routes.game)}>
          Wejdź do gry
        </Button>
        <Button variant="warn" onClick={logout}>
          logout
        </Button>
      </Flex>
    </Flex>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.neutral};
    border-radius: 20px;
    padding: 40px 24px;
    width: 300px;
    height: 400px;
  `,

  OutfitCanvas: styled.canvas`
    width: 96px;
    height: 144px;
    display: block;
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 20px;
    image-rendering: pixelated;
  `,

  Label: styled.p`
    color: #a9a9a9;
    opacity: 90%;
    margin: 0;
    padding: 0%;
    font-size: 14px;
    font-weight: 600;
  `,
};
