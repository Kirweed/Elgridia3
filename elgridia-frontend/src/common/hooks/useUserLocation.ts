import { useDocument } from "src/common/hooks/useDocument";
import { Location } from "src/common/types/PlayerTypes";

export const useUserLocation = () => {
  const [location] = useDocument<Location>("location");

  return location;
};
