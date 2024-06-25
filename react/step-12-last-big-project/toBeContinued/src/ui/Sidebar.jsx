import styled from "styled-components";
import Logo from "../ui/Logo";
import MainNav from "../ui/MainNav";

const SidebarStyled = styled.aside`
  padding: 3.2rem 2.4rem;
  border-right: 2px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <SidebarStyled>
      <Logo />
      <MainNav />
    </SidebarStyled>
  );
}

export default Sidebar;
