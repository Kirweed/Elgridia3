import styled from "styled-components";

const EqElements = [
  null,
  "helmet",
  null,
  "ring",
  "neckle",
  "gloves",
  "weapon",
  "chestplate",
  "shield",
  null,
  "pants",
  null,
  null,
  "boots",
];

export const Equipment = () => (
  <Styled.Container>
    {EqElements.map((element, index) =>
      element ? <Styled.EqElement key={index} /> : <Styled.EqPlaceholder />,
    )}
  </Styled.Container>
);

const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 32px);
    place-items: center;
  `,

  EqElement: styled.div`
    width: 32px;
    height: 32px;
    border: 1px solid white;
  `,

  EqPlaceholder: styled.div`
    width: 32px;
    height: 32px;
  `,
};
