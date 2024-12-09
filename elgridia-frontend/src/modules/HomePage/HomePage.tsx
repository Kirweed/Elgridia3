import { Heading } from "src/common/components";
import { useAuth } from "src/modules/auth/hooks";
import { LoginForm } from "src/modules/HomePage/components/LoginForm/LoginForm";
import styled from "styled-components";

export const HomePage = () => {
  const { name } = useAuth();
  console.log(name);
  return name ? (
    <p>Logged: {name}</p>
  ) : (
    <>
      <Styled.NavBar>
        <Heading level="h1">Elgridia</Heading>
      </Styled.NavBar>
      <LoginForm />
    </>
  );
};

const Styled = {
  NavBar: styled.nav`
    width: 100%;
    height: 10vh;
    background-color: #006796;
    font-family: FantaisieArtistique;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
