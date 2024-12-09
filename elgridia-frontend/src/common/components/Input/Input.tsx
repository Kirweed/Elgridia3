import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { FirebaseError } from "@firebase/util";
import styled from "styled-components";
import { Flex } from "src/common/components";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError | FirebaseError;
  postInputContent?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, error, width, postInputContent, ...props }, ref) => (
    <Flex direction="column" align="flex-start" gap={8}>
      {label && (
        <Styled.Label htmlFor={name} isError={!!error}>
          {label}
        </Styled.Label>
      )}
      <Flex direction={"column"} align={"flex-start"} gap={8}>
        <Flex gap={16} width="100%">
          <Styled.Field
            id={name}
            width={width}
            {...props}
            ref={ref}
            isError={!!error}
          />
          {postInputContent}
        </Flex>
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Flex>
    </Flex>
  ),
);

Input.displayName = "Input";

const Styled = {
  Label: styled.label<{ isError: boolean }>`
    color: ${({ isError, theme }) => (isError ? theme.colors.warn : "inherit")};
  `,

  Field: styled.input<{ isError: boolean }>`
    border: 2px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.warn : theme.colors.light};
    height: 48px;
    padding: 12px;
    gap: 10px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.neutral};
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    outline: 0;

    &:disabled {
      opacity: 0.5;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-background-clip: text;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
      transition: background-color 5000s ease-in-out 0s;
      box-shadow: inset 0 0 20px 20px ${({ theme }) => theme.colors.neutral};
    }
  `,

  Error: styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.warn};
  `,
};
