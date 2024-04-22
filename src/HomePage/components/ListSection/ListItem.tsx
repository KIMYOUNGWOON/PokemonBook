import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PokemonData } from "../../../util/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

interface Props {
  pokemonData: PokemonData;
}

const ListItem: React.FC<Props> = ({ pokemonData }) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLike((prev) => !prev);
  };

  return (
    <Container>
      <HeaderWrapper>
        <Number>No.{String(pokemonData.id).padStart(3, "0")}</Number>
        <BookmarkIcon
          icon={like ? faBookmark : faBookmarkRegular}
          onClick={handleClick}
        />
      </HeaderWrapper>
      <Image
        src={pokemonData.frontImage}
        onClick={() => {
          navigate(`/pokemon/${pokemonData.id}`);
        }}
      />
      <Name
        onClick={() => {
          navigate(`/pokemon/${pokemonData.id}`);
        }}
      >
        {pokemonData.name}
      </Name>
      <TypeWrapper>
        {pokemonData.types.map((type, index) => {
          return <Type key={index}>{type}</Type>;
        })}
      </TypeWrapper>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding: 14px 14px 20px;
  border: 2px solid #3864d2;
  border-radius: 8px;
  text-align: center;
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
`;

const BookmarkIcon = styled(FontAwesomeIcon)`
  color: rgba(1, 1, 1, 0.7);
  font-size: 22px;
  padding-bottom: 6px;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 140px;
  transition: 0.4s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
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

const Type = styled.div`
  padding: 6px 18px;
  background-color: aqua;
  border-radius: 20px;
  font-size: 14px;
`;

export default ListItem;
