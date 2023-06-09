import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { roundWithGoalState } from "../atoms";
import { GOAL_LIMIT, ROUND_LIMIT } from "../constants";

const Container = styled.div`
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

const RoundWithGoal = () => {
  const roundWithGoal = useRecoilValue(roundWithGoalState);

  return (
    <Container>
      <Round>
        <RoundText>{`${roundWithGoal.round}/${ROUND_LIMIT}`}</RoundText>
        <p>ROUND</p>
      </Round>
      <Round>
        <RoundText>{`${roundWithGoal.goal}/${GOAL_LIMIT}`}</RoundText>
        <p>GOAL</p>
      </Round>
    </Container>
  );
};

export default RoundWithGoal;
