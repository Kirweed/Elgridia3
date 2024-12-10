import { useNavigate } from "react-router";
import { Button } from "src/common/components/Button/Button";
import { routes } from "src/routes";
import styled from "styled-components";

export const LeftGameSidebar = () => {
  const navigate = useNavigate();
  return (
    <Styled.Container>
      <Styled.StatsInfo>
        <Styled.UsernameAnLevelLabel>
          <span>Username</span>
          <span>1 lvl</span>
        </Styled.UsernameAnLevelLabel>
        <span>Statystyki: </span>
        <Styled.StatsInfoGrid>
          <span>Siła:</span>
          <span>0</span>
          <span>Zręczność:</span>
          <span>0</span>
          <span>Mądrość:</span>
          <span>0</span>
          <span>Szczęście:</span>
          <span>0</span>
        </Styled.StatsInfoGrid>
      </Styled.StatsInfo>
      <Button variant="warn" onClick={() => navigate(routes.lobby)}>
        Wróć do lobby
      </Button>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    width: 200px;
    height: 100vh;
    border: 1px solid white;
    background-color: #222;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
  `,
  StatsInfo: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  `,

  StatsInfoGrid: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 5fr 1fr;
  `,

  UsernameAnLevelLabel: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};
