import styled from "styled-components";
import { Link } from "react-router-dom";
import pokeballImage from "../assets/color.jpeg";

const NotFoundPage = () => {
  return (
    <Container>
      <Pokeball src={pokeballImage} alt="Pokeball" />
      <Message>404 - Page Not Found</Message>
      <SubMessage>Oops! Looks like there is an API issue.</SubMessage>
      <HomeButton to="/">Go to Home</HomeButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Pokeball = styled.img`
  width: 200px;
  height: auto;
`;

const Message = styled.h1`
  font-size: 36px;
  color: #ff3e00;
  margin-top: 20px;
`;

const SubMessage = styled.p`
  font-size: 20px;
  color: #666;
  margin-top: 10px;
`;

const HomeButton = styled(Link)`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3864d2;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 18px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #304999;
  }
`;

export default NotFoundPage;
