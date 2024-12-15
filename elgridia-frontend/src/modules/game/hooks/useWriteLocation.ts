import { useCallback } from "react";
import { useWriteDocument } from "src/common/hooks";
import { Location } from "src/common/types/PlayerTypes";

export type UpdatePlayerLocation = (
  location: Pick<Location, "x" | "y"> & {
    id?: number;
  },
) => void;

export const useUpdatePlayerLocation = (mapId?: number) => {
  const writeDocument = useWriteDocument<Location>();

  const updatePlayerLocation: UpdatePlayerLocation = useCallback(
    (location) => {
      if (mapId === undefined) {
        return;
      }
      writeDocument("location", { ...location, id: location.id ?? mapId });
    },
    [writeDocument, mapId],
  );

  return updatePlayerLocation;
};
