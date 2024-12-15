import styled from "styled-components";

interface LocationInfoBarProps {
  x?: number;
  y?: number;
  name?: string;
}

export const LocationInfoBar = ({ x, y, name }: LocationInfoBarProps) => (
  <Styled.Container>
    <span>{name}</span>
    <span>{`${x}, ${y}`}</span>
  </Styled.Container>
);

const Styled = {
  Container: styled.div`
    width: fit-content;
    position: absolute;
    left: 200px;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.blue};
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    gap: 20px;
  `,
};
