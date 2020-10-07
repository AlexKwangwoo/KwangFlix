import React, { useEffect, useState } from "react";
import { movieApi, tvApi } from "../../api";
import DetailPresenter from "./DetailPresenter";

export default ({
  navigation,
  route: {
    params: { isTv, id, title, backgroundImage, poster, votes, overview },
  },
}) => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({
    title,
    backgroundImage,
    poster,
    overview,
    votes,
  }); //앱이 실행되면 params를 통해 각 위치마다의 영화속성 params들로 전달될것이고
  // 화면에 다뿌려져서 정상적으로 작동될것이다. 그다음 id의 변화가 느껴지면
  // 그다음 useEffect를 통해 getdata가 실행된다
  // getdata는 한 id의 정보를 다 가지고 있다

  const getData = async () => {
    if (isTv) {
      const [getMovie, getMovieError] = await tvApi.show(id);
    } else {
    }
    const [getMovie, getMovieError] = await movieApi.movie(id);
    // Api를 통해 영화정보를 들고온다!->id가 바뀔때만..useEffect에서.
    // useEffect는 사실 한번 처음에 실행하나.. 끝의 ,[id]); 에의해
    // 실행이 제한 당해져 버렸다!
    // 고른영화에 대해 setMovie로 다시 정보를 뿌려준다 detail에
    setMovie({
      ...getMovie,
      title: getMovie.title,
      backgroundImage: getMovie.backdrop_path,
      poster: getMovie.poster_path,
      overview: getMovie.overview,
      votes: getMovie.vote_average,
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [id]); // id의 움직임이 있을때만 getData에서 id를 봅은 무비정보를 캐치함!!
  React.useLayoutEffect(() => {
    navigation.setOptions({ title });
  }); // 이거 없으면 setoption오류뜸
  return <DetailPresenter movie={movie} loading={loading} />;
};
