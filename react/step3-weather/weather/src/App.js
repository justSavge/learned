import { useEffect, useState } from "react";
import Box from "./Box";
import ErrorMessage from "./ErrorMessage";
import LeftList from "./LeftList";
import Loading from "./Loading";
import Logo from "./Logo";
import Main from "./Main";
import Navbar from "./Navbar";
import NavbarResult from "./NavbarResult";
import RightList from "./RightList";
import Search from "./Search";
import MovieDetail from "./MovieDetail";
import Summary from "./Summary";
import useLocalStorage from "./useLocalStorage";

const key = "3d53d621";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [err, setErr] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useLocalStorage([]);
  // const [watched, setWatched] = useState(function () {
  //   const storeValue = localStorage.getItem("watched");
  //   return JSON.parse(storeValue);
  // });
  //错误示范
  //  const [watched, setWatched] = useState(JSON.parse(useState(localStorage.getItem("watched")));
  //这样会立刻执行，而上面的只在需要初始值时执行，避免了多次执行导致性能降低，并且上面更好处理错误与理解
  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );
  function handleSelectedId(selectedID) {
    setSelectedId((s) => (s === selectedID ? null : selectedID));
  }
  function handleClose() {
    setSelectedId(null);
  }
  useEffect(
    function () {
      handleClose();
      const controller = new AbortController(); //这是一个浏览器内置api,与React无关,这里用于阻止上一次浏览器请求
      async function fetchMovies() {
        try {
          setErr("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            // console.log(123);
            throw new Error("网络错误");
          }
          const json = await res.json();
          if (json.Response === "False") throw new Error("没有查询到该电影");
          setMovies(json.Search);
          // console.log(json); //解释一下为什么这里会输出2次，因为React再开发模式的严格模式下，为了防止出错
        } catch (err) {
          if (err.message === "signal is aborted without reason") {
            return;
          }
          setErr(err.message);
          console.log(err.message);
          // if (err.message === "") return;
        }
      }
      query.length && fetchMovies();
      return function () {
        setMovies([]);
        controller.abort();
      };
    },
    [query]
  );
  const hanleWatchedMovies = function (movie) {
    if (watched.filter((mo) => mo.id === movie.id).length) {
      //watched有这个电影，返回
      handleClose();
      return;
    }
    setWatched((w) => [...w, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie])); //上面的是异步的，只能这么搞
    handleClose();
  };
  const handleDelete = function (id) {
    setWatched((movies) => movies.filter((movie) => movie.id !== id));
  };

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavbarResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {movies.length ? (
            <LeftList movies={movies} onSelectedId={handleSelectedId} />
          ) : err ? (
            <ErrorMessage err={err} />
          ) : (
            query && <Loading />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              watched={watched}
              selectedId={selectedId}
              onClose={handleClose}
              onWatchedMovies={hanleWatchedMovies}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <RightList
                watched={watched}
                selectedId={selectedId}
                onDelete={handleDelete}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
