import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PokemonData } from "../../../util/types";
import { useRef, useState } from "react";
import monoPocketBall from "../../../assets/mono.jpeg";
import colorPocketBall from "../../../assets/color.jpeg";
import { TYPE_COLOR } from "../../../util/data";

interface Props {
  pokemonData: PokemonData;
}

const ListItem: React.FC<Props> = ({ pokemonData }) => {
  const [like, setLike] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const stringData = localStorage.getItem("myList");
  const myList = stringData ? JSON.parse(stringData) : [];
  const isChecked = myList.some(
    (data: PokemonData) => data.id === pokemonData.id
  );

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    const storedData = localStorage.getItem("myList");
    let myList = storedData ? JSON.parse(storedData) : [];

    if (!like) {
      myList.push(pokemonData);
    } else {
      myList = myList.filter((data: PokemonData) => data.id !== pokemonData.id);
    }

    localStorage.setItem("myList", JSON.stringify(myList));

    setLike((prev) => !prev);
  };

  return (
    <Container
      ref={containerRef}
      $isHovered={isHovered}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <HeaderWrapper>
        <Number $isHovered={isHovered}>
          No.{String(pokemonData.id).padStart(3, "0")}
        </Number>
        <PocketBall
          src={like || isChecked ? colorPocketBall : monoPocketBall}
          onClick={handleClick}
        />
      </HeaderWrapper>
      <Image
        src={pokemonData.frontImage}
        $isHovered={isHovered}
        onClick={() => {
          navigate(`/pokemon/${pokemonData.id}`);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      />
      <Name
        onClick={() => {
          navigate(`/pokemon/${pokemonData.id}`);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        {pokemonData.name}
      </Name>
      <TypeWrapper>
        {pokemonData.types.map((type, index) => {
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
    </Container>
  );
};

const Container = styled.div<{ $isHovered: boolean }>`
  flex: 1;
  padding: 14px 14px 20px;
  border: ${({ $isHovered }) =>
    $isHovered ? "2px solid #fdcb05" : "2px solid #3864d2"};
  border-radius: 8px;
  text-align: center;
  transition: 0.5s;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Number = styled.div<{ $isHovered: boolean }>`
  color: ${({ $isHovered }) =>
    $isHovered ? "rgba(1, 1, 1, 0.8)" : "rgba(1, 1, 1, 0.2)"};
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

const Image = styled.img<{ $isHovered: boolean }>`
  width: 140px;
  transition: 0.4s;
  ${({ $isHovered }) => ($isHovered ? "transform: scale(1.2)" : "")}
`;

const Name = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Type = styled.div<{ $backgroundColor: string; $fontColor: string }>`
  padding: 7px 18px 9px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $fontColor }) => $fontColor};
  border-radius: 20px;
  font-size: 14px;
`;

export default ListItem;
