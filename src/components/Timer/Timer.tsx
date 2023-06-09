import styled from "styled-components";
import TimerCard from "./TimerCard";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Colon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 3rem;
`;

interface IProps {
  minutes: React.ReactNode;
  seconds: React.ReactNode;
}

const Timer = ({ minutes, seconds }: IProps) => {
  return (
    <Container>
      {minutes}
      {/* <TimerCard text={minutes} /> */}
      <Colon>:</Colon>
      {seconds}
      {/* <TimerCard text={seconds} /> */}
    </Container>
  );
};

export default Timer;
