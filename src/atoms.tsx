import { atom } from "recoil";
import { MILLI_SECOND } from "./constrant";

interface IRoundGoal {
  round: number;
  goal: number;
}

export const intervalState = atom<string | null>({
  key: "interval",
  default: null,
});

export const timeState = atom<number>({
  key: "time",
  default: MILLI_SECOND,
});

export const roundWithGoalState = atom<IRoundGoal>({
  key: "roundWithGoal",
  default: {
    round: 0,
    goal: 0,
  },
});
