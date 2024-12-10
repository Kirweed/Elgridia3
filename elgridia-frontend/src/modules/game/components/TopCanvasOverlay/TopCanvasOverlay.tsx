import { Heading } from "src/common/components";
import { useUserBaseInfo } from "src/common/hooks/useUserBaseInfo";
import styled from "styled-components";

export const TopCanvasOverlay = () => {
  const { nick, level } = useUserBaseInfo();

  return (
    <Styled.Container>
      <Styled.HpBar />
      <Heading level="h4" fantasy>
        {nick}
      </Heading>
      <Heading level="h4" fantasy>
        {level} lvl
      </Heading>
      <Styled.FatigueBar />
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.main};
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
    background-color: #cf2929;
    border: 2px solid ${({ theme }) => theme.colors.main};
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
    border: 2px solid ${({ theme }) => theme.colors.main};
    border-left: none;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 18px;
    transform: translateY(-50%);
  `,
};
