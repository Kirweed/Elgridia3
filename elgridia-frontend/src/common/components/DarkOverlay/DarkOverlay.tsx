import { HTMLAttributes } from "react";
import styled from "styled-components";

export interface DarkOverlayProps extends HTMLAttributes<HTMLDivElement> {
  absolute?: boolean;
  zIndex?: number;
}

export const DarkOverlay = (props: DarkOverlayProps) => (
  <Styled.Overlay {...props} />
);

const Styled = {
  Overlay: styled.div<Pick<DarkOverlayProps, "absolute" | "zIndex">>`
    opacity: 0.7;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    position: ${({ absolute }) => (absolute ? "absolute" : "fixed")};
    z-index: ${({ zIndex }) => zIndex ?? 99};
  `,
};
