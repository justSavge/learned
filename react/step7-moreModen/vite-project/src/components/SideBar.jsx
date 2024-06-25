import style from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div className={style.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={style.footer}>
        <p className={style.copyright}>
          have a good day,we server for you in {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
