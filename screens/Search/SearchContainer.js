import React, { useState } from "react";
import { movieApi, tvApi } from "../../api";
import SearchPresenter from "./SearchPresenter";

export default () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState({
    movies: [],
    shows: [],
    movieError: null,
    showError: null,
  });

  const onChange = (text) => setKeyword(text);
  const search = async () => {
    if (keyword === "") {
      return;
    }
    const [movies, movieError] = await movieApi.search(keyword);
    const [shows, showError] = await tvApi.search(keyword);
    setResults({
      movies,
      movieError,
      shows,
      showError,
    });
  };

  return (
    <SearchPresenter
      {...results} // 다른곳에서 이걸받을려면 인자값으로 접근해야함 results.~~ 안됨!
      onChange={onChange}
      onSubmit={search}
      keyword={keyword}
    />
  );
};
