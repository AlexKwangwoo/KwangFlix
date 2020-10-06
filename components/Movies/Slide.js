import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { apiImage } from "../../api";
import Poster from "../Poster";
import Votes from "../Votes";
import { trimText } from "../../utils";

const Container = styled.View`
  height: 100%;
  width: 100%;
`;

const BG = styled.Image`
  height: 100%;
  width: 100%;
  opacity: 0.4;
  position: absolute;
`;

const Content = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Data = styled.View`
  width: 50%;
  align-items: flex-start;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 19px;
  margin-bottom: 10px;
`;

const VotesContainer = styled.Text`
  margin-bottom: 7px;
`;

const Overview = styled.Text`
  color: rgb(220, 220, 220);
  font-size: 14px;
  font-weight: 500;
`;

const Button = styled.View`
  background-color: #e74c3c;
  padding: 7px 10px;
  margin-top: 10px;
  border-radius: 3px;
`;
const ButtonText = styled.Text`
  color: white;
`;

const Slide = ({ id, title, backgroundImage, votes, overview, poster }) => (
  <Container>
    <BG source={{ uri: apiImage(backgroundImage) }} />
    <Content>
      <Poster url={poster} />
      <Data>
        <Title>{trimText(title, 40)}</Title>
        <VotesContainer>
          <Votes votes={votes} />
        </VotesContainer>
        <Overview>{trimText(overview, 100)}</Overview>
        <TouchableOpacity>
          <Button>
            <ButtonText>View Details</ButtonText>
          </Button>
        </TouchableOpacity>
      </Data>
    </Content>
  </Container>
);

// moviePreserter로 props를 받을땐 모든 state를 받아서 type검사를 안했다
// 여기서는 원하는것만 받을거기때문에 proptype 검사를 해야한다!

Slide.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
};

export default Slide;
