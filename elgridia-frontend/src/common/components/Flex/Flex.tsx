import { HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  align?: "center" | "flex-start" | "flex-end" | "normal" | "stretch";
  justify?: "flex-start" | "center" | "space-between" | "flex-end";
  wrap?: "nowrap" | "wrap";
  gap?: number;
  height?: string;
  width?: string;
  grow?: number;
}

export const Flex = ({ children, ...props }: PropsWithChildren<FlexProps>) => (
  <Styled.Container {...props}>{children}</Styled.Container>
);

const Styled = {
  Container: styled.div<FlexProps>`
    display: flex;
    flex-direction: ${({ direction = "row" }) => direction};
    align-items: ${({ align = "center" }) => align};
    justify-content: ${({ justify = "flex-start" }) => justify};
    flex-grow: ${({ grow = 0 }) => grow};
    gap: ${({ gap = 0 }) => gap}px;
    width: ${({ width = "auto" }) => width};
    height: ${({ height = "auto" }) => height};
    flex-wrap: ${({ wrap = "nowrap" }) => wrap};
  `,
};
