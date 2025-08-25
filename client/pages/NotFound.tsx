import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const HomeLink = styled.a`
  color: #3b82f6;
  text-decoration: underline;
  
  &:hover {
    color: #1d4ed8;
  }
`;

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Container>
      <Content>
        <Title>404</Title>
        <Description>Oops! Page not found</Description>
        <HomeLink href="/">
          Return to Home
        </HomeLink>
      </Content>
    </Container>
  );
};

export default NotFound;
