import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

type ButtonType = {
  variant: "primary" | "default" | "ghost" | "success" | "warn";
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Properties = Record<
  ButtonType["variant"],
  {
    background: string;
    hover: string;
    disabled: string;
  }
>;

const properties: Properties = {
  primary: {
    background: "main",
    hover: "hover",
    disabled: "disabled",
  },
  default: {
    background: "neutral",
    hover: "neutral",
    disabled: "neutral",
  },
  ghost: {
    background: "none",
    hover: "none",
    disabled: "none",
  },
  success: {
    background: "success",
    hover: "success",
    disabled: "success",
  },
  warn: {
    background: "warn",
    hover: "warn",
    disabled: "warn",
  },
};

export const Button = ({
  children,
  ...props
}: PropsWithChildren<ButtonType>) => (
  <Styled.Button {...props}>{children}</Styled.Button>
);
const Styled = {
  Button: styled.button<ButtonType>`
    width: fit-content;
    padding: 12px 20px;
    border: 1px solid ${({ theme }) => theme.colors.main};
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    background-color: ${({ theme, variant }) =>
      theme.colors[properties[variant].background]};

    &:hover {
      background-color: ${({ theme, variant }) =>
        theme.colors[properties[variant].hover]};
    }

    &:disabled {
      background-color: ${({ theme, variant }) =>
        theme.colors[properties[variant].disabled]};
    }
  `,
};
