import { FontAwesome } from "@expo/vector-icons";
import Link from "../../components/Detail/Link";
import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { apiImage } from "../../api";
import Poster from "../../components/Poster";
import ScrollContainer from "../../components/ScrollContainer";
import Votes from "../../components/Votes";
import { formatDate } from "../../utils";

const BG = styled.Image`
  width: 100%;
  height:100%
  opacity: 0.4;
  position: absolute;
`;

const Header = styled.View`
  height: ${Dimensions.get("window").height / 3}px;
  align-items: center;
  justify-content: flex-end;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  top: 30px;
`;

const Info = styled.View`
  width: 50%;
  margin-left: 40px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Data = styled.View`
  margin-top: 30px;
  padding: 0px 30px;
`;

const DataName = styled.Text`
  margin-top: 30px;
  color: white;
  opacity: 0.8;
  font-weight: bold;
  margin-bottom: 15px;
`;

const DataValue = styled.Text`
  color: white;
  opacity: 0.8;
  font-weight: 300;
`;

export default ({ openBrowser, result, loading }) => (
  <ScrollContainer
    loading={false}
    contentContainerStyle={{ paddingBottom: 80 }}
  >
    <>
      <Header>
        <BG source={{ uri: apiImage(result.backgroundImage, "-") }} />
        <Container>
          <Poster url={result.poster} />
          <Info>
            <Title>{result.title}</Title>
            {result.votes ? <Votes votes={result.votes} /> : null}
          </Info>
        </Container>
      </Header>
      <Data>
        {result.overview ? (
          <>
            <DataName>Overview</DataName>
            <DataValue>{result.overview}</DataValue>
          </>
        ) : null}
        {loading ? (
          <ActivityIndicator style={{ marginTop: 30 }} olor={"white"} />
        ) : null}
        {result.spoken_languages ? (
          <>
            <DataName>Languages</DataName>
            <DataValue>
              {result.spoken_languages.map((l) => `${l.name} `)}
            </DataValue>
          </>
        ) : null}
        {result.release_date ? (
          <>
            <DataName>Release Date</DataName>
            <DataValue>{formatDate(result.release_date)}</DataValue>
          </>
        ) : null}
        {result.status ? (
          <>
            <DataName>Status</DataName>
            <DataValue>{result.status}</DataValue>
          </>
        ) : null}
        {result.runtime ? (
          <>
            <DataName>Runtime</DataName>
            <DataValue>{result.runtime} minutes</DataValue>
          </>
        ) : null}
        {result.first_air_date ? (
          <>
            <DataName>First Air Date</DataName>
            <DataValue>{formatDate(result.first_air_date)}</DataValue>
          </>
        ) : null}
        {result.genres ? (
          <>
            <DataName>Genres</DataName>
            <DataValue>
              {result.genres.map((g, index) =>
                index + 1 === result.genres.length ? g.name : `${g.name}, `
              )}
            </DataValue>
          </>
        ) : null}
        {result.number_of_episodes ? (
          <>
            <DataName>Seasons / Episodes</DataName>
            <DataValue>
              {result.number_of_seasons} / {result.number_of_episodes}
            </DataValue>
          </>
        ) : null}
        {result.imdb_id ? (
          <>
            <DataName>Links</DataName>
            <Link
              text={"IMDB Page"}
              icon={"imdb"}
              onPress={() =>
                openBrowser(`https://www.imdb.com/title/${result.imdb_id}`)
              }
            />
          </>
        ) : null}
        {result.videos.results?.length > 0 ? (
          //비디오는 로딩중이면 에러일것!
          // 왜냐하면 로딩중인데 실행을누르면 정보가 없기때문!
          // if 만약 결과가 0보다 크다면 밑에 껄 보여줄것임!!
          <>
            <DataName>Videos</DataName>
            {result.videos.results.map((video) => (
              <Link
                text={video.name}
                key={video.id}
                icon="youtube-play"
                onPress={() =>
                  openBrowser(`https://www.youtube.com/watch?v=${video.key}`)
                }
              />
            ))}
          </>
        ) : null}
      </Data>
    </>
  </ScrollContainer>
);
//네비게이션으로부터 자동적으로 받을수있는 props
// formatDate 내가 만든 함수!
