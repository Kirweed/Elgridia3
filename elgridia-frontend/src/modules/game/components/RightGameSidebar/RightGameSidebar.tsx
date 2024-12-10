import { Backpack } from "src/modules/game/components/Backpack/Backpack";
import Eq from "src/modules/game/components/Equipment/Equipment";
import styled from "styled-components";

export const RightGameSidebar = () => (
  <Styled.Container>
    <Eq />
    <span>Plecak: </span>
    <Backpack />
  </Styled.Container>
);

const Styled = {
  Container: styled.div`
    width: 220px;
    height: 100vh;
    border: 1px solid white;
    background-color: #222;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    gap: 20px;
  `,
};
