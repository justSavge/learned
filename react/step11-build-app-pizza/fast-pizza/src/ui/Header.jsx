import { Link } from "react-router-dom";
import SearchOrder from "../features/order/searchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex justify-between border-b border-stone-500 bg-yellow-400 tracking-[3px] sm:px-6 md:py-5 md:text-base">
      {/* 注意这里的sm是以min-width为起步 */}
      <Link to="/" className="my-auto">
        G2的NEXA本人披萨店
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
