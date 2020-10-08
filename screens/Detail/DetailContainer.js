import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { movieApi, tvApi } from "../../api";
import DetailPresenter from "./DetailPresenter";

export default ({
  navigation,
  route: {
    params: { isTv, id, title, backgroundImage, poster, votes, overview },
  },
}) => {
  // const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({
    loading: true,
    result: {
      title,
      backgroundImage,
      poster,
      overview,
      votes,
      videos: {
        // videos는 show와 movie에 append에(api) 포함되어있다
        results: [],
      },
    },
  }); //앱이 실행되면 params를 통해 각 위치마다의 영화속성 params들로 전달될것이고
  // 화면에 다뿌려져서 정상적으로 작동될것이다. 그다음 id의 변화가 느껴지면
  // 그다음 useEffect를 통해 getdata가 실행된다
  // getdata는 한 id의 정보를 다 가지고 있다

  const getData = async () => {
    const [getDetail, getDetailError] = isTv
      ? await tvApi.show(id)
      : await movieApi.movie(id);
    setDetail({
      loading: false,
      result: {
        ...getDetail, //여기안에 presenter나머지prop이 들어있음!
        title: getDetail.title || getDetail.name,
        backgroundImage: getDetail.backdrop_path,
        poster: getDetail.poster_path,
        overview: getDetail.overview,
        votes: getDetail.vote_average,
      },
    });

    // Api를 통해 영화정보를 들고온다!->id가 바뀔때만..useEffect에서.
    // useEffect는 사실 한번 처음에 실행하나.. 끝의 ,[id]); 에의해
    // 실행이 제한 당해져 버렸다!
    // 고른영화에 대해 setMovie로 다시 정보를 뿌려준다 detail에
    // setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [id]); // id의 움직임이 있을때만 getData에서 id를 봅은 무비정보를 캐치함!!
  React.useLayoutEffect(() => {
    navigation.setOptions({ title });
  }); // 이거 없으면 setoption오류뜸

  const openBrowser = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return <DetailPresenter openBrowser={openBrowser} {...detail} />;
};
