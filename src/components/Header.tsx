import styled from "styled-components";

const SHeader = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Header = () => {
  return <SHeader>POMODORO</SHeader>;
};

export default Header;
