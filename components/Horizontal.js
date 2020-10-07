import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import Poster from "./Poster";
import Votes from "./Votes";
import { apiImage } from "../api";
import { formatDate, trimText } from "../utils";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: flex-start;
`;
const Data = styled.View`
  align-items: flex-start;
  width: 65%;
  margin-left: 25px;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReleaseDate = styled.Text`
  color: white;
  opacity: 0.8;
  font-size: 12px;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  margin-top: 10px;
`;

const Horizontal = ({
  id,
  isTv = false,
  title,
  poster,
  overview,
  releaseDate,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Detail", {
      isTv,
      id,
      title,
      poster,
      overview,
      releaseDate,
    }); //여기서 Detail이름은 Detail.js 파일이름!
  };
  // touchable을 눌렀을때 네비게이션을 이용한다!
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster url={poster} />
        <Data>
          <Title>{trimText(title, 30)}</Title>
          {releaseDate ? (
            <ReleaseDate>{formatDate(releaseDate)}</ReleaseDate>
          ) : null}
          <Overview>{trimText(overview, 130)}</Overview>
        </Data>
      </Container>
    </TouchableOpacity>
  );
};
Horizontal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string, //release는 required안함
  poster: PropTypes.string, // 몇몇은 포스터가 없다!
  overview: PropTypes.string.isRequired,
};

export default Horizontal;
