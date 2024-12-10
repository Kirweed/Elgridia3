import { PropsWithChildren, HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  size: "XL" | "L" | "M" | "S" | "XS";
  align?: "unset" | "left" | "right" | "center";
  color?: string;
  margin?: number;
  fantasy?: boolean;
}

const sizes = {
  XL: "16px",
  L: "16px",
  M: "14px",
  S: "14px",
  XS: "12px",
};

const weights = {
  XL: "600",
  L: "400",
  M: "600",
  S: "400",
  XS: "600",
};

export const Text = ({
  children,
  ...props
}: PropsWithChildren<HeadingProps>) => (
  <Styled.Text {...props}>{children}</Styled.Text>
);

const Styled = {
  Text: styled.div<HeadingProps>`
    margin: ${({ margin = 0 }) => `0 0 ${margin}px`};
    color: ${({ theme, color }) => color ?? theme.colors.white};
    font-size: ${({ size }) => sizes[size]};
    font-weight: ${({ size }) => weights[size]};
    text-align: ${({ align = "unset" }) => align};

    ${({ fantasy }) =>
      fantasy &&
      css`
        font-family: FantaisieArtistique;
      `}
  `,
};
