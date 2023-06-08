import { atom } from "recoil";

export const intervalState = atom<string | null>({
  key: "interval",
  default: null,
});

export const timeState = atom<number>({
  key: "time",
  default: 3,
});

interface IRoundGoal {
  round: number;
  goal: number;
}

export const roundWithGoalState = atom<IRoundGoal>({
  key: "roundWithGoal",
  default: {
    round: 0,
    goal: 0,
  },
});
