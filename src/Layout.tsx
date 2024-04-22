import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import pokemonLogo from "./assets/pokemon-logo.png";
import pageLogo from "./assets/page-logo.png";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Header>
          <PokemonLogo
            src={pokemonLogo}
            onClick={() => {
              navigate("/");
            }}
          />
        </Header>
        <LogoWrapper>
          <PageLogo src={pageLogo} />
        </LogoWrapper>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const PokemonLogo = styled.img`
  width: 180px;
  margin: 0 auto;
  &:hover {
    cursor: pointer;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const PageLogo = styled.img`
  width: 300px;
`;

const Footer = styled.footer`
  height: 200px;
  background-color: #f6f6f6;
`;

export default Layout;
