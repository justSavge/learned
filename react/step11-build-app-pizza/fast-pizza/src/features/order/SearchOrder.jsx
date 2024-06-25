import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="输入订单号,并回车..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className=" rounded-full px-3 py-1 text-center text-sm transition-all duration-300 placeholder:text-stone-400 focus:ring  focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 md:h-7 md:w-60 md:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
