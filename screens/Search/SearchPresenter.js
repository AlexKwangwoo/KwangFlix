import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import Input from "../../components/Search/Input";
import HorizontalSlider from "../../components/HorizontalSlider";
import Vertical from "../../components/Vertical";
import ScrollContainer from "../../components/ScrollContainer";

// A && B 에서 A가 아니면 B가 나타나지 않는걸 밑에서 이용했다!
export default ({ movies, shows, keyword, onChange, onSubmit }) => (
  <ScrollContainer
    refreshFn={onSubmit}
    // search는 refreshFn 인자(새로고침으)로써 onsubmit(getdata)와 같은 내용을 원한다!
    loading={false}
    contentContainerStyle={{
      paddingTop: 10,
    }}
  >
    <Input
      placeholder={"Write a keyword"}
      value={keyword}
      onChange={onChange}
      onSubmit={onSubmit}
    />
    {movies !== null && movies.length !== 0 && (
      <HorizontalSlider title={"Movie Results"}>
        {movies.map((movie) => (
          <Vertical
            key={movie.id}
            id={movie.id}
            votes={movie.vote_average}
            title={movie.title}
            poster={movie.poster_path}
          />
        ))}
      </HorizontalSlider>
    )}
    {shows !== null && shows.length !== 0 && (
      <HorizontalSlider title={"TV Results"}>
        {shows.map((show) => (
          <Vertical
            isTv={true}
            //티비인지 movie인지 따라 detailContainer에 값을 저장해뒀음
            key={show.id}
            id={show.id}
            votes={show.vote_average}
            title={show.name}
            poster={show.poster_path}
          />
        ))}
      </HorizontalSlider>
    )}
  </ScrollContainer>
);
