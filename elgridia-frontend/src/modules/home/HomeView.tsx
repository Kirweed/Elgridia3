import { Flex, Heading } from "src/common/components";
import { LoginForm } from "src/modules/home/components/LoginForm/LoginForm";
import styled from "styled-components";
import Logo from "src/assets/Logo.png";
import backgroundImage from "src/assets/background.jpg";
import { theme } from "src/styles";

export const HomeView = () => (
  <>
    <Styled.NavBar>
      <Flex gap={12} height="100%">
        <Styled.Logo src={Logo} />
        <Heading level="h1">Elgridia</Heading>
      </Flex>
      <Heading level="h2" color={theme.colors.white} fantasy>
        Witaj w Elgridii przybyszu!
      </Heading>
    </Styled.NavBar>
    <Styled.Layout>
      <LoginForm />
    </Styled.Layout>
  </>
);

const Styled = {
  Layout: styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 60px;
    padding-top: 5vh;
    background: url(${backgroundImage}) no-repeat;
    background-size: 100% 100%;
  `,
  NavBar: styled.nav`
    width: 100%;
    height: 10vh;
    padding: 4px 28px;
    background-color: ${({ theme }) => theme.colors.main};
    font-family: FantaisieArtistique;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  Logo: styled.img`
    height: 80%;
  `,
};
