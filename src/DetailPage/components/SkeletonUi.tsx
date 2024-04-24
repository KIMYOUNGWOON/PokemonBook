import styled from "styled-components";

const SkeletonUi = () => {
  return (
    <Container>
      <LeftWrapper>
        <TitleBox />
        <ListBox />
      </LeftWrapper>
      <InfoBox>
        <ProfileWrapper>
          <Wrapper>
            <Name />
            <Number />
            <Profile />
          </Wrapper>
          <Image />
        </ProfileWrapper>
        <MiddleWrapper>
          <Type>
            <Key />
            <Value />
          </Type>
          <Ability>
            <Key />
            <Value />
          </Ability>
        </MiddleWrapper>
        <StatsBox />
      </InfoBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 60px;
  padding-top: 80px;
  margin-bottom: 80px;
`;

const LeftWrapper = styled.div``;

const TitleBox = styled.div`
  width: 180px;
  height: 40px;
  background-color: rgba(1, 1, 1, 0.1);
  margin-bottom: 20px;
`;

const ListBox = styled.div`
  width: 337px;
  height: 500px;
  background-color: rgba(1, 1, 1, 0.1);
`;

const InfoBox = styled.div`
  flex: 1;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div``;

const Name = styled.div`
  width: 260px;
  height: 40px;
  background-color: rgba(1, 1, 1, 0.1);
  margin-bottom: 12px;
`;

const Number = styled.div`
  width: 100px;
  height: 26px;
  background-color: rgba(1, 1, 1, 0.1);
  margin-bottom: 18px;
`;

const Profile = styled.div`
  width: 300px;
  height: 200px;
  background-color: rgba(1, 1, 1, 0.1);
  margin-bottom: 12px;
`;

const Image = styled.div`
  width: 300px;
  height: 300px;
  background-color: rgba(1, 1, 1, 0.1);
  margin-bottom: 34px;
`;

const MiddleWrapper = styled.div`
  display: flex;
  gap: 186px;
  margin-bottom: 34px;
`;

const Type = styled.div``;

const Ability = styled.div``;

const Key = styled.div`
  width: 60px;
  height: 30px;
  background-color: rgba(1, 1, 1, 0.1);
  margin-bottom: 10px;
`;

const Value = styled.div`
  width: 200px;
  height: 50px;
  background-color: rgba(1, 1, 1, 0.1);
`;

const StatsBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: rgba(1, 1, 1, 0.1);
`;

export default SkeletonUi;
