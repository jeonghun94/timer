import styled from "styled-components";
import { BsDot, BsPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { intervalState, roundWithGoalState, timeState } from "../atoms";
import { motion } from "framer-motion";
import Button from "./Button";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  max-width: 480px;
  margin: auto;
  padding: 1.5rem 0;
  gap: 5rem;
  padding-top: 5rem;
`;

const Header = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
`;

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

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// const ButtonContainer = styled.div`
//   width: 100%;
//   height: 20%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Button = styled(motion.button)`
//   width: 20%;
//   height: 60%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 100%;
//   font-size: 4rem;
//   opacity: 0.7;
//   color: #fff;
// `;

const RoundContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const Round = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const RoundText = styled.p`
  opacity: 0.7;
`;

const Home = () => {
  const SECONDS = 1500;
  const ROUND_LIMIT = 1;
  const GOAL_LIMIT = 3;
  const [isRunning, setIsRunning] = useState(false);
  const [roundWithGoal, setRoundWithGoal] = useRecoilState(roundWithGoalState);
  const [intervalId, setIntervalId] = useRecoilState(intervalState);
  const [time, setTime] = useRecoilState(timeState);

  const [isFirstCardAnimated, setIsFirstCardAnimated] = useState(false);

  const formatTime = (seconds: number) => {
    const duration = new Date(seconds * 1000).toISOString();
    const timeString = duration.split("T")[1];
    const formattedTime = timeString.split(".")[0];

    return formattedTime;
  };

  const Card2 = ({ children }: { children?: React.ReactNode }) => {
    return (
      <Card
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </Card>
    );
  };

  const handleStart = () => {
    setIsRunning(!isRunning);
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 500);

    setIntervalId(String(timer));
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
    clearInterval(String(intervalId));
  };

  useEffect(() => {
    if (time === 0 || roundWithGoal.round === ROUND_LIMIT) {
      clearInterval(Number(intervalId));
      setTime(SECONDS);
      setRoundWithGoal((prev) => ({
        ...prev,
        round: roundWithGoal.round === 2 ? 0 : prev.round + 1,
        goal: roundWithGoal.round === 2 ? prev.goal + 1 : prev.goal,
      }));
      setIsRunning(false);
    }

    if (formatTime(time).split(":")[2] === "00") {
      setIsFirstCardAnimated((prev) => !prev);
    } else {
      setIsFirstCardAnimated(false);
    }
  }, [time]);

  return (
    <Container>
      <Header>POMODORO</Header>
      <CardContainer>
        <Card
          initial={{ scale: isFirstCardAnimated ? 0.7 : 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardText>{formatTime(time).split(":")[1]}</CardText>
        </Card>

        <IconContainer>
          <BsDot />
          <BsDot />
        </IconContainer>

        <Card2>
          <CardText>{formatTime(time).split(":")[2]}</CardText>
        </Card2>
      </CardContainer>

      <Button
        isRunning={isRunning}
        handlePause={handlePause}
        handleStart={handleStart}
      />

      <RoundContainer>
        <Round>
          <RoundText>
            <span>{roundWithGoal.round}</span>
            <span>/</span>
            <span>{ROUND_LIMIT}</span>
          </RoundText>
          <p>ROUND</p>
        </Round>
        <Round>
          <RoundText>
            <span>{roundWithGoal.goal}</span>
            <span>/</span>
            <span>{GOAL_LIMIT}</span>
          </RoundText>
          <p>GOAL</p>
        </Round>
      </RoundContainer>
    </Container>
  );
};

export default Home;
