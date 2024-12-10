import { useNavigate } from "react-router";
import { Flex, Heading, Text } from "src/common/components";
import { Button } from "src/common/components/Button/Button";
import { useUserBaseInfo } from "src/common/hooks/useUserBaseInfo";
import { routes } from "src/routes";
import styled from "styled-components";

const stats = [
  { name: "Siła", value: 0 },
  { name: "Zręczność", value: 0 },
  { name: "Mądrość", value: 0 },
  { name: "Szczęście", value: 0 },
  { name: "Szybkość", value: 0 },
];

export const LeftGameSidebar = () => {
  const navigate = useNavigate();
  const { nick, level } = useUserBaseInfo();

  return (
    <Styled.Container>
      <Styled.StatsInfo>
        <Flex justify="space-between" width="100%">
          <Heading level="h3" fantasy>
            {nick}
          </Heading>
          <Heading level="h3" fantasy>
            {level} lvl
          </Heading>
        </Flex>
        <Heading level="h3" fantasy>
          Statystyki:
        </Heading>
        <Flex direction="column" width="100%">
          {stats.map(({ name, value }) => (
            <Flex key={name} width="100%" justify="space-between">
              <Text size="L" fantasy>
                {name}
              </Text>
              <Text size="L" fantasy>
                {value}
              </Text>
            </Flex>
          ))}
        </Flex>
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
};
