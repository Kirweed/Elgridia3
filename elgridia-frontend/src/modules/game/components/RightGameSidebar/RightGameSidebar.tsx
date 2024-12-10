import { Text } from "src/common/components";
import { Backpack, Equipment } from "src/modules/game/components";
import styled from "styled-components";

export const RightGameSidebar = () => (
  <Styled.Container>
    <Equipment />
    <Text size="L" fantasy>
      Plecak:
    </Text>
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
