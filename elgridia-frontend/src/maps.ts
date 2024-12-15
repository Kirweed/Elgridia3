import startValley from "src/assets/maps/start-valley.png";

export type Cord = [number, number];
export type Map = {
  name: string;
  id: number;
  walls: Cord[];
  npcs: Cord[];
  img: string;
};

export const maps: Map[] = [
  {
    name: "Uskok Yworokdrah",
    id: 0,
    walls: [],
    npcs: [],
    img: startValley,
  },
];
