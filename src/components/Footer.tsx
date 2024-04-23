import styled from "styled-components";
import logo from "../assets/pokemon-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

const TOP_LIST = ["Blog", "Portfolio", "About", "Careers", "Support"];
const FLEX_START_LIST = ["© 2024 Pokedex", "Terms", "Privacy", "Cookies"];
const FLEX_END_LIST = [
  "Jobs",
  "Designers",
  "Freelancers",
  "Tags",
  "Places",
  "Resources",
];

const Footer = () => {
  return (
    <Container>
      <TopWrapper>
        <LogoImage src={logo} />
        <ListWrapper>
          {TOP_LIST.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </ListWrapper>
        <IconWrapper>
          <Icon icon={faFacebook} />
          <Icon icon={faInstagram} />
          <Icon icon={faTwitter} />
          <Icon icon={faTwitch} />
        </IconWrapper>
      </TopWrapper>
      <BottomWrapper>
        <FlexStartWrapper>
          {FLEX_START_LIST.map((item) => (
            <BottomListItem key={item}>{item}</BottomListItem>
          ))}
        </FlexStartWrapper>
        <FlexEndWrapper>
          {FLEX_END_LIST.map((item) => (
            <BottomListItem key={item}>{item}</BottomListItem>
          ))}
        </FlexEndWrapper>
      </BottomWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 240px;
  padding-top: 20px;
  border-top: 1px solid #3864d2;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
`;

const LogoImage = styled.img`
  width: 140px;
`;

const ListWrapper = styled.div`
  display: flex;
  gap: 50px;
`;

const ListItem = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 24px;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexStartWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const FlexEndWrapper = styled(FlexStartWrapper)``;

const BottomListItem = styled.div`
  color: rgba(1, 1, 1, 0.5);
`;

export default Footer;
