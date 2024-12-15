import { useDocument } from "src/common/hooks/useDocument";
import { BaseInfo } from "src/common/types/PlayerTypes";

export const useUserBaseInfo = () => {
  const [baseInfo] = useDocument<BaseInfo>("baseInfo");

  return { ...baseInfo };
};
