import styled from "styled-components";

const BackpackElements = Array.from(Array(60).keys());

export const Backpack = () => (
  <Styled.Container>
    {BackpackElements.map((element, index) => (
      <Styled.BackpackElement key={index} />
    ))}
  </Styled.Container>
);

const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(6, 32px);
  `,

  BackpackElement: styled.div`
    width: 32px;
    height: 32px;
    border: 1px solid white;
  `,
};
