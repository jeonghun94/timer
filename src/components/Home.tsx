import styled from "styled-components";
import { BsDot, BsPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { intervalState, roundWithGoalState, timeState } from "../atoms";

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

const Card = styled.div`
  width: 30%;
  padding: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121c26;
  border-radius: 5px;
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

const ButtonContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 20%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-size: 4rem;
  opacity: 0.7;
  color: #fff;
`;

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
  const seconds = 3;
  const [isRunning, setIsRunning] = useState(false);

  const [roundWithGoal, setRoundWithGoal] = useRecoilState(roundWithGoalState);
  const [intervalId, setIntervalId] = useRecoilState(intervalState);
  const [time, setTime] = useRecoilState(timeState);

  const timeFormat = (seconds: number) => {
    const duration = new Date(seconds * 1000).toISOString();
    const timeString = duration.split("T")[1];
    const formattedTime = timeString.split(".")[0];
    return formattedTime;
  };

  const handleStart = () => {
    setIsRunning(!isRunning);

    const id = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    setIntervalId(id + "");
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
    clearInterval(intervalId + "");
  };

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalId + "");
      setTime(seconds);
      setRoundWithGoal((prev) => {
        return {
          ...prev,
          round: prev.round + 1,
        };
      });
      setIsRunning(false);
    }

    if (roundWithGoal.round === 2) {
      clearInterval(intervalId + "");
      setTime(seconds);
      setRoundWithGoal((prev) => {
        return {
          ...prev,
          round: 0,
          goal: prev.goal + 1,
        };
      });
      setIsRunning(false);
    }
  }, [time]);

  return (
    <Container>
      <Header>{"jhun ㅇ_<"}</Header>
      <CardContainer>
        <Card>
          <CardText>{timeFormat(time).split(":")[1]}</CardText>
        </Card>
        <IconContainer>
          <BsDot />
          <BsDot />
        </IconContainer>
        <Card>
          <CardText>{timeFormat(time).split(":")[2]}</CardText>
        </Card>
      </CardContainer>

      <ButtonContainer>
        <Button onClick={isRunning ? handlePause : handleStart}>
          {isRunning ? (
            <BsFillPauseFill />
          ) : (
            <BsPlayFill
              style={{
                paddingLeft: "0.5rem",
              }}
            />
          )}
        </Button>
      </ButtonContainer>

      <RoundContainer>
        <Round>
          <RoundText>
            <span>{roundWithGoal.round}</span>
            <span>/</span>
            <span>2</span>
          </RoundText>
          <p>ROUND</p>
        </Round>
        <Round>
          <RoundText>
            <span>{roundWithGoal.goal}</span>
            <span>/</span>
            <span>3</span>
          </RoundText>
          <p>GOAL</p>
        </Round>
      </RoundContainer>
    </Container>
  );
};

export default Home;
