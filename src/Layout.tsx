import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import pokemonLogo from "./assets/pokemon-logo.png";
import Footer from "./components/Footer";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

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
          <NavList>
            <NavListItem
              $isActive={path === "/"}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </NavListItem>
            <NavListItem
              $isActive={path === "/my-pokedex"}
              onClick={() => {
                navigate("/my-pokedex");
              }}
            >
              My Pokedex
            </NavListItem>
          </NavList>
        </Header>
        <Outlet />
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
  padding-top: 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 80px;
  margin-bottom: 30px;
`;

const PokemonLogo = styled.img`
  width: 180px;
  margin: 0 auto;
  &:hover {
    cursor: pointer;
  }
`;

const NavList = styled.div`
  flex: 1;
  display: flex;
  gap: 40px;
`;

const NavListItem = styled.div<{ $isActive: boolean }>`
  padding-bottom: 4px;
  border-bottom: ${({ $isActive }) => ($isActive ? "3px solid #3864d2" : "")};
  color: ${({ $isActive }) => ($isActive ? "#3864d2" : "#d3defe")};
  font-size: 18px;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;

export default Layout;
