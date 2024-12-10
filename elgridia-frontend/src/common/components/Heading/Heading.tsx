import { PropsWithChildren, HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "unset" | "left" | "right" | "center";
  color?: string;
  margin?: number;
  fantasy?: boolean;
}

const headingSizes = {
  h1: "48px",
  h2: "36px",
  h3: "24px",
  h4: "20px",
  h5: "16px",
  h6: "12px",
};

const headingWeights = {
  h1: "700",
  h2: "600",
  h3: "500",
  h4: "500",
  h5: "500",
  h6: "500",
};

export const Heading = ({
  children,
  ...props
}: PropsWithChildren<HeadingProps>) => (
  <Styled.Text as={props.level} {...props}>
    {children}
  </Styled.Text>
);

const Styled = {
  Text: styled.div<HeadingProps>`
    margin: ${({ margin = 0 }) => `0 0 ${margin}px`};
    color: ${({ theme, color }) => color ?? theme.colors.white};
    font-size: ${({ level }) => headingSizes[level]};
    font-weight: ${({ level }) => headingWeights[level]};
    text-align: ${({ align = "unset" }) => align};

    ${({ fantasy }) =>
      fantasy &&
      css`
        font-family: FantaisieArtistique;
      `}
  `,
};
