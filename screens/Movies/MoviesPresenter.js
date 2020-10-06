import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions, View, ScrollView } from "react-native";
import Slide from "../../components/Movies/Slide";
import Title from "../../components/Title";
import Vertical from "../../components/Vertical";
import Horizontal from "../../components/Horizontal";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
//screen으로 하지말고 window로 해야된다!

// const Container = styled.View`
//   flex: 1;
//   background-color: black;
//   justify-content: center;
// `;

const SliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 4}px;
  margin-bottom: 50px;
`;

const Container = styled.View``;

const UpcomingContainer = styled.View`
  margin-top: 20px;
`;
// const Header = styled.View`
//   width: 100%;
//   height: ${height / 3}px;
// `; //height의 ${width}은 dimensions의 요소의 width을 가져오는것임!

// const Section = styled.View`
//   background-color: red;
//   height: 100%;
// `;

// const Text = styled.Text``;

//controlsEnabled={false} loop timeout={3000} pre next를 업엔다! 그리고 자동 전환한다!
//로딩할때 뻉뻉이 돌아가게하는것이다!
// map은 key를 요구 할것임!
// Container에서 scroll view로 바꿔줌 -> 스크롤이 들어갈꺼라서
export default ({ loading, nowPlaying, popular, upcoming }) => (
  <ScrollView
    style={{ backgroundColor: "black" }}
    contentContainerStyle={{
      flex: loading ? 1 : 0,
      justifyContent: loading ? "center" : "flex-start",
    }}
  >
    {loading ? (
      <ActivityIndicator color="white" size="small" />
    ) : (
      <>
        <SliderContainer>
          <Swiper controlsEnabled={false} loop timeout={3}>
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                votes={movie.vote_average}
                backgroundImage={movie.backdrop_path}
                poster={movie.poster_path}
              />
            ))}
          </Swiper>
        </SliderContainer>
        <Container>
          <Title title={"Popular Movies"} />
          <ScrollView
            style={{ marginVertical: 20, marginBottom: 40 }}
            contentContainerStyle={{ paddingLeft: 30 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {popular.map((movie) => (
              <Vertical
                key={movie.id}
                id={movie.id}
                poster={movie.poster_path}
                title={movie.title}
                votes={movie.vote_average}
              />
            ))}
          </ScrollView>
          <Title title={"Comming Soon"}></Title>
          <UpcomingContainer>
            {upcoming.map((movie) => (
              <Horizontal
                key={movie.id}
                id={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                poster={movie.poster_path}
                overview={movie.overview}
              />
            ))}
          </UpcomingContainer>
        </Container>
      </>
    )}
  </ScrollView>
);
