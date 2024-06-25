import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className={style.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Homepage</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">price</NavLink>
        </li>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>{" "}
        <li>
          <NavLink to="/login" className={style.ctaLink}>
            login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
