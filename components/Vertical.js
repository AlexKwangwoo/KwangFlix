import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { apiImage } from "../api";
import Poster from "./Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { trimText } from "../utils";

const Container = styled.View`
  align-items: center;
  margin-right: 20px;
`;
const Title = styled.Text`
  color: white;
  font-weight: 500;
  margin: 10px 0px 5px 0px;
`;

const Vertical = ({ isTv = false, id, poster, title, votes }) => {
  const navigation = useNavigation(); //props를 사용하게 해주는 hook!
  const goToDetail = () => {
    navigation.navigate("Detail", {
      isTv,
      id,
      poster,
      votes,
      title, // title:title 과 똑같다..js가 처리함!
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster url={poster} />
        <Title>{trimText(title, 10)}</Title>
        {votes > 0 && <Votes votes={votes} />}
      </Container>
    </TouchableOpacity>
  );
};
//여기서 타이틀은 메인페이지의 자동으로 넘어가는 타이틀과는 다르다
// 그래서 그냥 import를 하지 않았음!
// 그리고 votes를 import 해서 이미 import안에 votes가 styled.View로 정의
// 되어 있다.. 그래서 여기서 두번하면 중복 정의로 오류생긴다!

Vertical.propTypes = {
  id: PropTypes.number.isRequired,
  poster: PropTypes.string, //몇몇은 포스터가 없다!
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
};

export default Vertical;
