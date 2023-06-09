import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { intervalState, roundWithGoalState, timeState } from "../atoms";
import { MILLI_SECOND, ROUND_LIMIT } from "../constrant";
import { formatTime } from "../utils";
import Layout from "./Layout";
import TimerButton from "./Button";
import RoundWithGoal from "./Round";
import Timer from "./Timer/Timer";
import TimerCard from "./Timer/TimerCard";

const Home = () => {
  const [intervalId, setIntervalId] = useRecoilState(intervalState);
  const [roundWithGoal, setRoundWithGoal] = useRecoilState(roundWithGoalState);
  const [time, setTime] = useRecoilState(timeState);

  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [first, setFirst] = useState(false);

  const handleStart = () => {
    setIsRunning(!isRunning);
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 100);

    setIntervalId(String(timer));
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
    clearInterval(String(intervalId));
  };

  const Minutes = ({ minutes }: { minutes: string }) => {
    return <TimerCard value={minutes} initialScale={first ? 0.7 : 1} />;
  };

  const Seconds = ({ seconds }: { seconds: string }) => {
    return <TimerCard value={seconds} initialScale={0.7} />;
  };

  useEffect(() => {
    if (time === 0) {
      clearInterval(Number(intervalId));
      setTime(MILLI_SECOND);
      setRoundWithGoal((prev) => ({
        ...prev,
        round: roundWithGoal.round === 2 ? 0 : prev.round + 1,
      }));
      setIsRunning((prev) => !prev);
    }

    if (roundWithGoal.round >= ROUND_LIMIT) {
      clearInterval(Number(intervalId));
      setTime(MILLI_SECOND);
      setRoundWithGoal((prev) => ({
        round: 0,
        goal: roundWithGoal.goal === 2 ? 0 : prev.goal + 1,
      }));
      setIsRunning(false);
    }
    const timeFormatted = formatTime(time).split(":");

    setMinutes(timeFormatted[1]);
    setSeconds(timeFormatted[2]);

    seconds === "01" ? setFirst(true) : setFirst(false);
  }, [time]);

  return (
    <Layout>
      <Timer
        minutes={<Minutes minutes={minutes} />}
        seconds={<Seconds seconds={seconds} />}
      />

      <TimerButton
        isRunning={isRunning}
        handlePause={handlePause}
        handleStart={handleStart}
      />

      <RoundWithGoal />
    </Layout>
  );
};

export default Home;
