import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  totalItems: number;
}

const PaginationButton: React.FC<Props> = ({ totalItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const offsetValue = searchParams.get("offset");

  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentIndex = Number(offsetValue) / itemsPerPage;
  const startIndex = Math.floor(currentIndex / 6);
  const endIndex = totalPages - 1;

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).slice(
      startIndex * 6,
      startIndex * 6 + 6
    );
  }, [totalPages, startIndex]);

  const handleClick = (offset: number) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("offset", String(offset));
    currentParams.set("limit", String(itemsPerPage));
    setSearchParams(currentParams);
  };

  return (
    <Container>
      {currentIndex > 5 && (
        <ArrowIcon
          icon={faAnglesLeft}
          onClick={() => {
            const offset = (startIndex - 1) * 54;
            handleClick(offset);
          }}
        />
      )}
      {currentIndex > 0 && (
        <ArrowIcon
          icon={faAngleLeft}
          onClick={() => {
            const offset = Number(offsetValue) - 9;
            handleClick(offset);
          }}
        />
      )}
      {pageNumbers.map((number) => (
        <PageNumberButton
          key={number}
          $select={number === currentIndex + 1}
          onClick={() => {
            const offset = (number - 1) * 9;
            handleClick(offset);
          }}
        >
          {number}
        </PageNumberButton>
      ))}
      {endIndex - currentIndex > 4 && <DotText>•••</DotText>}
      {endIndex !== currentIndex && (
        <ArrowIcon
          icon={faAngleRight}
          onClick={() => {
            const offset = Number(offsetValue) + 9;
            handleClick(offset);
          }}
        />
      )}
      {endIndex - currentIndex > 4 && (
        <ArrowIcon
          icon={faAnglesRight}
          onClick={() => {
            const offset = (startIndex + 1) * 54;
            handleClick(offset);
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const PageNumberButton = styled.div<{ $select: boolean }>`
  width: 30px;
  height: 30px;
  padding-top: 9px;
  background-color: ${({ $select }) => ($select ? "#d3defe" : "")};
  color: #3864d2;
  border-radius: 50%;
  text-align: center;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    font-weight: 700;
  }
`;

const DotText = styled.div`
  padding-top: 3px;
  color: #3864d2;
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  color: #3864d2;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

export default PaginationButton;
