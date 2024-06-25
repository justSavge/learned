const average = (arr) => {
  const avg = arr?.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  // console.log(avg);
  return avg % 1 ? avg.toFixed(2) : avg;
};
export default function Summary({ watched }) {
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.myRating));
  const avgRuntime = average(
    watched?.map((movie) => Number(movie.Runtime.split(" ").at(0)))
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
