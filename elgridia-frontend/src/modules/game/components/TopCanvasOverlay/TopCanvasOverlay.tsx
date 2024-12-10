import { memo } from "react";
import styled from "styled-components";

export const TopCanvasOverlay = memo(() => (
  <Styled.Container>
    <Styled.HpBar />
    <span>Username</span>
    <span>1 lvl</span>
    <Styled.FatigueBar />
  </Styled.Container>
));

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 10px;
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 30px;
  `,

  HpBar: styled.div`
    position: absolute;
    top: 50%;
    left: -250px;
    width: 250px;
    background-color: ${({ theme }) => theme.colors.error};
    border: 4px solid ${({ theme }) => theme.colors.blue};
    border-right: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    height: 18px;
    transform: translateY(-50%);
  `,

  FatigueBar: styled.div`
    position: absolute;
    top: 50%;
    right: -250px;
    width: 250px;
    background-color: white;
    border: 4px solid ${({ theme }) => theme.colors.blue};
    border-left: none;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 18px;
    transform: translateY(-50%);
  `,
};
