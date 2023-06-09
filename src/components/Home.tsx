import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { intervalState, roundWithGoalState, timeState } from "../atoms";
import { MILLI_SECOND, ROUND_LIMIT } from "../constrant";
import { motion } from "framer-motion";
import { formatTime } from "../utils";
import Layout from "./Layout";
import TimerButton from "./Button";
import RoundWithGoal from "./Round";

const CardContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Card = styled(motion.div)`
  width: 30%;
  padding: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121c26;
  border-radius: 10px;
`;

const CardText = styled.h3`
  color: #bcc0c3;
  font-size: 3.5rem;
`;

const Colon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 3rem;
`;

const Home = () => {
  const [roundWithGoal, setRoundWithGoal] = useRecoilState(roundWithGoalState);
  const [intervalId, setIntervalId] = useRecoilState(intervalState);
  const [time, setTime] = useRecoilState(timeState);
  const [isRunning, setIsRunning] = useState(false);

  const [t, setT] = useState("");
  const [first, setFirst] = useState(false);

  const handleStart = () => {
    setIsRunning(!isRunning);
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    setIntervalId(String(timer));
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
    clearInterval(String(intervalId));
  };

  const Card2 = ({ children }: { children?: React.ReactNode }) => {
    return (
      <Card
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </Card>
    );
  };

  const Card1 = ({ children }: { children?: React.ReactNode }) => {
    return (
      <Card
        initial={{ scale: first ? 0.7 : 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </Card>
    );
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
      setFirst(true);
    }

    setT(formatTime(time).split(":")[2]);

    t === "00" ? setFirst(true) : setFirst(false);

    if (roundWithGoal.round >= ROUND_LIMIT) {
      clearInterval(Number(intervalId));
      setTime(MILLI_SECOND);
      setRoundWithGoal((prev) => ({
        round: 0,
        goal: roundWithGoal.goal === 2 ? 0 : prev.goal + 1,
      }));
      setIsRunning(false);
    }
  }, [time]);

  return (
    <Layout>
      <CardContainer>
        <Card1>
          <CardText>{formatTime(time).split(":")[1]}</CardText>
        </Card1>
        <Colon>:</Colon>
        <Card2>
          <CardText>{formatTime(time).split(":")[2]}</CardText>
        </Card2>
      </CardContainer>

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
