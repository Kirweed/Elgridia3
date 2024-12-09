import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

type ButtonType = {
  varaint: "primary" | "default" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

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
    border: 1px solid ${({ theme }) => theme.colors.light};
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    background-color: ${({ theme, varaint }) =>
      varaint === "default" ? theme.colors.neutral : theme.colors.light};

    &:hover {
      background-color: ${({ theme, varaint }) =>
        varaint === "default" ? theme.colors.neutral : theme.colors.hover};
    }

    &:disabled {
      background-color: ${({ theme, varaint }) =>
        varaint === "default" ? theme.colors.neutral : theme.colors.disabled};
    }
  `,
};
