import { useEffect, useState } from "react";

export default function useFetch(url) {
  // const [data, setData] = useState({});
  useEffect(
    function () {
      async function getCurrentMovie() {
        const res = await fetch(url);
        const data = await res.json();
        // setData(resData);
        return [data, false];
      }
      getCurrentMovie();
    },
    [url]
  );
}
