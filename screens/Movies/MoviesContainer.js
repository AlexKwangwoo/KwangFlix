import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { movieApi } from "../../api";
import MoviesPresenter from "./MoviesPresenter";

// export default ({ navigation }) => {
//prop를 받는다! 거기중 속성이 navigation을 쓸거임!
// default 다음 이름이 없으면 자동으로 그 파일제목이 여기 이름이 되는듯함!
export default () => {
  // const [nowPlaying, setNowPlaying] = useState({
  //   movies: [],
  //   error: null,
  // });
  const [refreshing, setRefresing] = useState(false);
  const [movies, setMovies] = useState({
    loading: true,
    nowPlaying: [],
    popular: [],
    upcoming: [],
    nowPlayingError: null,
    popularError: null,
    upcomingError: null,
  });
  const getData = async () => {
    // console.log(nowPlaying, error);
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();
    // console.log(nowPlaying);
    setMovies({
      loading: false,
      nowPlaying,
      popular,
      upcoming,
      nowPlayingError,
      popularError,
      upcomingError,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  //[]은 항상 업데이트 안할것이다! 빈칸은 항상없데이트.. 안에 정해주면 그때만 업데이트

  // const onRefresh = async () => {
  //   setRefresing(true);
  //   await getDate();
  //   setRefresing(false);
  // }; //새로 고침을 위한 설정!

  return <MoviesPresenter refreshFn={getData} {...movies} />;
  // presenter로 데이터 넘겨준다!

  // return <MoviesPresenter loading={movies.loading} B=_B C=_C 대신에 ...movies쓰면됨! />;
  // props 줄때!
};
// // <View style={{ flex: 1, backgroundColor: "black" }}>
//   {/* <Text style={{ color: "white" }}>{movies.nowPlaying?.length}</Text> */}
//   {/* <Button
//     onPress={() => navigation.navigate("Detail")}
//     // stack.screen의 name을 들고와야한다!
//     title="Go to Detail"
//   ></Button> */}
// {/* </View> */}
