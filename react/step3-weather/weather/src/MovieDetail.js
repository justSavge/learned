import { useState, useEffect, useRef } from "react";
import StarRating from "./SubmitStar";
import Loading from "./Loading";
// import useFetch from "./useFetch";

const key = "3d53d621";
export default function MovieDetail({
  selectedId,
  onClose,
  onWatchedMovies,
  watched,
}) {
  const [theMovie, setTheMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [myRating, setMyRating] = useState(0);
  const starModifyTime = useRef(0);
  function handleMyRating(v) {
    setMyRating(v);
  }
  useEffect(
    function () {
      if (myRating) {
        starModifyTime.current++;
      }
    },
    [myRating]
  );
  useEffect(
    function () {
      async function getCurrentMovie() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const dataJson = await res.json();
        setTheMovie(dataJson);
        setIsLoading(false);
        // console.log(dataJson);
      }
      getCurrentMovie();
    },
    [selectedId]
  );
  // let movieUrl = `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`;
  // const [mydata, myload] = useFetch(movieUrl);//不好搞，修改mydata不会导致重新渲染，然而在加入一个useState也太脑淤血了，算了算了
  // console.log(mydata);
  // mydata && setTheMovie(mydata) && setIsLoading(myload);
  useEffect(
    function () {
      const esc = function (e) {
        e.code === "Escape" && onClose();
      };

      document.addEventListener("keydown", esc);
      return function () {
        document.removeEventListener("keydown", esc);
      };
    },
    [onClose]
  );

  const {
    Poster,
    Title,
    Genre,
    imdbRating,
    Plot,
    Actors,
    Director,
    Runtime,
    year,
  } = theMovie;
  // console.log(theMovie);

  const addMovieRight = {
    id: selectedId,
    Poster, //图片路径
    Title,
    Runtime,
    imdbRating: Number(imdbRating),
    year,
    myRating,
    countRecordStar: starModifyTime.current,
  };
  // onWatchedMovies(addMovieRight);
  const isWatched = watched.filter((w) => {
    return w.id === addMovieRight.id;
  });
  useEffect(
    function () {
      document.title = `电影-${addMovieRight.Title ? addMovieRight.Title : ""}`;
      return function () {
        document.title = "李俊欢迎您~";
      };
    },
    [addMovieRight.Title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              X
            </button>
            <img src={Poster} alt=":(" />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>{Genre}</p>
              <p>
                评分 {imdbRating}
                <span>⭐</span>
              </p>
            </div>
          </header>
          <section>
            {isWatched.length ? (
              <p>你已经打分了 ⭐{isWatched[0].myRating}</p>
            ) : (
              <>
                <div className="rating">
                  <p>评价</p>
                  <StarRating
                    starNum={10}
                    onMyRating={handleMyRating}
                    key={addMovieRight.id}
                  />
                </div>
                {myRating > 0 && (
                  <button
                    className="btn-add"
                    onClick={() => onWatchedMovies(addMovieRight)}
                  >
                    加入清单
                  </button>
                )}
              </>
            )}

            <p>
              <em>{Plot}</em>
            </p>
            <p>演员： {Actors}</p>
            <p>导演： {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
