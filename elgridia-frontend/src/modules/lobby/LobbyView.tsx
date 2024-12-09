import { Heading } from "src/common/components";
import { Button } from "src/common/components/Button/Button";
import { useAuth } from "src/modules/auth/hooks";

export const LobbyView = () => {
  const { name, logout } = useAuth();
  return (
    <>
      <Heading level="h1">Witaj w lobby {name}</Heading>
      <Button varaint="primary" onClick={logout}>
        Logout
      </Button>
    </>
  );
};
