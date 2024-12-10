import styled from "styled-components";
import { Flex, Heading } from "src/common/components";
import { Button } from "src/common/components/Button/Button";
import { useAuth } from "src/modules/auth/hooks";
import userOutfit from "src/assets/sprites/woj1.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useDocument } from "src/common/hooks";

interface SpriteConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animations?: any;
  currentAnimation?: string;
  src: string;
  animationFrameLimit?: number;
}

class SimpleSprite {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animations: any;
  currentAnimation: string;
  currentAnimationFrame: number;
  image: HTMLImageElement;
  isLoaded: boolean;
  animationFrameLimit: number;
  animationFrameProgress: number;

  constructor(config: SpriteConfig) {
    this.isLoaded = false;

    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-left": [[0, 1]],
      "idle-right": [[0, 2]],
      "idle-up": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-left": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-right": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-up": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  udpateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress--;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame++;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  setAnimation(key: string) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const [frameX, frameY] = this.frame;

    if (this.isLoaded)
      ctx.drawImage(this.image, frameX * 32, frameY * 48, 32, 48, 0, 0, 32, 48);

    this.udpateAnimationProgress();
  }
}

export const LobbyView = () => {
  const { logout, uid } = useAuth();
  const [nick] = useDocument<string>("nick");
  const [level] = useDocument<string>("level");

  console.log(uid, nick, level);

  const navigate = useNavigate();
  const canvas = useRef<HTMLCanvasElement>(null);

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
        <Button
          variant="primary"
          onClick={() => {
            navigate("/game");
          }}
        >
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
