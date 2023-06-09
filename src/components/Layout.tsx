import Header from "./Header";
import styled from "styled-components";

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

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
