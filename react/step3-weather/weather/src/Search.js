import { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(
    function () {
      const callBack = (e) => {
        if (e.code === "Enter") {
          if (document.activeElement === inputEl.current) {
            return;
          }
          inputEl.current.focus();
          setQuery("");
        }
      };
      inputEl.current.focus();
      document.addEventListener("keydown", callBack);
      return () => {
        document.addEventListener("keydown", callBack);
      };
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
