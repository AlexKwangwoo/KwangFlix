import axios from "axios";

const TMDB_KEY = "590d3e1feaf29a49ef0a30d7033af133";

const makeRequest = (path, params) =>
  axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      ...params,
      api_key: TMDB_KEY,
    },
  }); // API작동할려면 이렇게 해야한다.. 홈페이지 참고로 만든것!

const getAnything = async (path, params = {}) => {
  try {
    const {
      data: { results }, // result가 data안에 없을때가 있다... 그경우
      data,
      //data를 반환해주자!!!
    } = await makeRequest(path, params);
    // params는 보통 빈자리지만, 밑에보면 region이나 query가 들어간다
    return [results || data, null]; //useState에서 처음은 결과 두번째는 에러기떄문에
    // 처음array[0]dms result가.. 두번째는 null로 에러없음을..
    // result가 없으면 data를 받아온다!
    // 여기서의 결과값은 movies의 useState를 이용해 movies의 내용을 넣어줄꺼임!
  } catch (e) {
    return [null, e]; // 여기선 결과 null과 에러를 넣어준다!
  }
};

export const movieApi = {
  nowPlaying: () => getAnything("/movie/now_playing"),
  popular: () => getAnything("/movie/popular"),
  upcoming: () => getAnything("/movie/upcoming", { region: "kr" }),
  search: (query) => getAnything("/search/movie", { query }),
  movie: (id) => getAnything(`/movie/${id}`), // 영화 세부사항
  discover: () => getAnything("/discover/movie"),
};

export const tvApi = {
  today: () => getAnything("/tv/airing_today"),
  thisWeek: () => getAnything("/tv/on_the_air"),
  topRated: () => getAnything("/tv/top_rated"),
  popular: () => getAnything("/tv/popular"),
  search: (query) => getAnything("/search/tv", { query }),
  show: (id) => getAnything(`/tv/${id}`),
};

export const apiImage = (path) => `https://image.tmdb.org/t/p/w500${path}`;
