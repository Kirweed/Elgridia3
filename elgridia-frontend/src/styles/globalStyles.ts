import { createGlobalStyle } from "styled-components";
import FantaisieArtistique from "src/assets/FantaisieArtistique.otf";

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;

    @font-face {
    font-family: FantaisieArtistique;
    src: url(${FantaisieArtistique}) format("opentype");
}
  }

  html {
    font-size: 62.5%; // 10px, happy rems
  }

  body {
    background-color: ${({ theme }) => theme.colors.main};
    color: #fff;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  textarea {
    font-family: inherit;
  }

  button {
    font-family: "Inter", sans-serif;
    border: none;
    background-color: inherit;
    color: inherit;

    &:hover {
      cursor: pointer;
    }
  }
`;
