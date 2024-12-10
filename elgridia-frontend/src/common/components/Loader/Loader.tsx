import Logo from "src/assets/Logo.png";
import { DarkOverlay } from "src/common/components/DarkOverlay";
import { Heading } from "src/common/components/Heading";
import { theme } from "src/styles";
import styled, { keyframes } from "styled-components";

export const Loader = () => (
  <>
    <DarkOverlay />
    <Styled.Loader>
      <img src={Logo} width="300px" />
      <Heading level="h2" fantasy color={theme.colors.main}>
        Elgridia potrzebuje chwili na załadowanie...
      </Heading>
    </Styled.Loader>
  </>
);

const animation = keyframes`
    0% {
        opacity: 0.5
    }
    50% {
        opacity: 1;
    }
    100% {
       opacity: 0.5
    }
`;

const Styled = {
  Loader: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    position: absolute;
    white-space: nowrap;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    animation: ${animation} 2s infinite linear;
  `,
};
