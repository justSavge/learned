import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiTwotoneHome } from "react-icons/ai";
import { HiCalendarDays } from "react-icons/hi2";
import { LuHotel } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { MdSettingsSuggest } from "react-icons/md";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

//使用其他非HTML提供标签的方式
const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <AiTwotoneHome />
            <span>主页</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <HiCalendarDays />
            <span>预定</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <LuHotel />
            <span>客房</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <FaUsers />
            <span>用户</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <MdSettingsSuggest />
            <span>设置</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
