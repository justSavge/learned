export default function RightList({ watched, selectedId, onDelete }) {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <li key={movie.id}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.myRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.Runtime}</span>
            </p>
            <button className="btn-delete" onClick={() => onDelete(movie.id)}>
              ☠️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
