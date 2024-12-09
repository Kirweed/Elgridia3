import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Flex, Heading, Input } from "src/common/components";
import { useAuth } from "src/modules/auth/hooks";
import { LoginValues } from "src/modules/auth/types";

export const LoginForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, error } = useAuth();

  const handleLogin: SubmitHandler<LoginValues> = (data) => {
    login(data);
    reset();
  };

  return (
    <Flex direction="column" align="normal" width="100%" gap={40}>
      <Flex direction="column" align="normal" gap={8}>
        <Heading level="h2">Witaj w Elgridii przybyszu!</Heading>
        <p>Zaloguj się</p>
      </Flex>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Flex direction="column" align="normal" gap={24}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: {
                value: true,
                message: "You must specify a email address",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <Input
                label="Email"
                type="email"
                {...field}
                error={errors.email}
                width="MAX"
              />
            )}
          />
          <Flex direction="column" align="normal" gap={8}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "You must specify a password",
                },
              }}
              render={({ field }) => (
                <Input
                  label="Hasło"
                  type="password"
                  autoComplete="off"
                  {...field}
                  error={errors.password}
                  width="MAX"
                />
              )}
            />
            {error && (
              <Styled.Error>
                {error.code === "auth/too-many-requests"
                  ? "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
                  : "You have entered an invalid email or password"}
              </Styled.Error>
            )}
          </Flex>
          <Flex direction="column" align="normal" gap={40}>
            <button type="submit">Log in</button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

const Styled = {
  Error: styled.span`
    font-size: 12px;
    color: ${({ theme }) => "red"};
  `,
};
