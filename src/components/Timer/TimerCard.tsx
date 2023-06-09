import styled from "styled-components";
import { motion } from "framer-motion";

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

const TimerCard = ({
  value,
  initialScale,
}: {
  value: string;
  initialScale: number;
}) => {
  return (
    <Card
      initial={{ scale: initialScale }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CardText>{value}</CardText>
    </Card>
  );
};

export default TimerCard;
