import { AuthenticatedRootRouter, UnauthenticatedRouter } from "src/routes";
import { useAuth } from "src/modules/auth/hooks";

function App() {
  const { uid } = useAuth();
  return uid ? <AuthenticatedRootRouter /> : <UnauthenticatedRouter />;
}

export default App;
