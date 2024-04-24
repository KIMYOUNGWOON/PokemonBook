import styled from "styled-components";
import pageLogo from "../assets/page-logo.png";
import { PokemonData } from "../util/types";
import colorPocketBall from "../assets/color.jpeg";
import { useNavigate } from "react-router-dom";
import { TYPE_COLOR } from "../util/data";
import { useEffect, useState } from "react";

const MyPokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("myList");
    const myList = storedData ? JSON.parse(storedData) : [];
    const sortedMyList = myList.sort(
      (a: PokemonData, b: PokemonData) => a.id - b.id
    );
    setPokemonList(sortedMyList);
  }, []);

  const handleClick = (id: number) => {
    const removedPokemonList = pokemonList.filter(
      (pokemon: PokemonData) => pokemon.id !== id
    );
    localStorage.setItem("myList", JSON.stringify(removedPokemonList));
    setPokemonList(removedPokemonList);
  };

  return (
    <Container>
      <PageLogo src={pageLogo} />
      {pokemonList.length === 0 && (
        <Empty>
          My pokedex is empty. <br />
          <SubText
            onClick={() => {
              navigate("/");
            }}
          >
            Going to add Pokemon →
          </SubText>
        </Empty>
      )}
      <ListWrapper>
        {pokemonList.map((pokemon: PokemonData) => {
          return (
            <ListItem key={pokemon.id}>
              <HeaderWrapper>
                <Number>No.{String(pokemon.id).padStart(3, "0")}</Number>
                <PocketBall
                  src={colorPocketBall}
                  onClick={() => {
                    handleClick(pokemon.id);
                  }}
                />
              </HeaderWrapper>
              <Image
                src={pokemon.frontImage}
                onClick={() => {
                  navigate(`/pokemon/${pokemon.id}`);
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
              />
              <Name
                onClick={() => {
                  navigate(`/pokemon/${pokemon.id}`);
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
              >
                {pokemon.name}
              </Name>
              <TypeWrapper>
                {pokemon.types.map((type, index) => {
                  return (
                    <Type
                      key={index}
                      $backgroundColor={TYPE_COLOR[type].backgroundColor}
                      $fontColor={TYPE_COLOR[type].fontColor}
                    >
                      {type}
                    </Type>
                  );
                })}
              </TypeWrapper>
            </ListItem>
          );
        })}
      </ListWrapper>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const PageLogo = styled.img`
  width: 300px;
  margin-bottom: 30px;
`;

const Empty = styled.div`
  padding-top: 100px;
  color: rgba(1, 1, 1, 0.3);
  font-size: 34px;
  font-weight: 700;
`;

const SubText = styled.div`
  padding-top: 16px;
  color: rgba(1, 1, 1, 0.8);
  font-size: 18px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding-top: 30px;
  margin-bottom: 80px;
`;

const ListItem = styled.div`
  height: 297px;
  padding: 14px 14px 20px;
  border: 2px solid #3864d2;
  border-radius: 8px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Number = styled.div`
  color: rgba(1, 1, 1, 0.2);
  font-size: 24px;
  font-weight: 900;
  transition: 0.4s;
`;

const PocketBall = styled.img`
  width: 32px;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 140px;
  &:hover {
    cursor: pointer;
  }
`;

const Name = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Type = styled.div<{ $backgroundColor: string; $fontColor: string }>`
  padding: 6px 18px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $fontColor }) => $fontColor};
  border-radius: 20px;
  font-size: 14px;
`;

export default MyPokedex;
