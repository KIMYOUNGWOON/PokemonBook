import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = () => {
  return (
    <Container>
      <Loading icon={faSpinner} spinPulse />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  text-align: center;
`;

const Loading = styled(FontAwesomeIcon)`
  margin-top: 200px;
  color: #3864d2;
  font-size: 60px;
`;

export default LoadingSpinner;
