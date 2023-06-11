import styled from "styled-components";
import { motion } from "framer-motion";
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs";

const Container = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IButton = styled(motion.button)`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-size: 4rem;
  opacity: 0.7;
  color: #fff;
`;

interface IProps {
  isRunning: boolean;
  handleStart: () => void;
  handlePause: () => void;
}

const Button = ({ isRunning, handleStart, handlePause }: IProps) => {
  return (
    <Container>
      <IButton
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.8 }}
        onClick={isRunning ? handlePause : handleStart}
      >
        {isRunning ? (
          <BsFillPauseFill />
        ) : (
          <BsPlayFill
            style={{
              paddingLeft: "0.5rem",
            }}
          />
        )}
      </IButton>
    </Container>
  );
};

export default Button;
