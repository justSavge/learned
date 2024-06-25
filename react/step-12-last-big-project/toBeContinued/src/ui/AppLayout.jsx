import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
const Main = styled.main`
  padding: 5rem;
  background-color: var(--color-grey-100);
  overflow: scroll;
  -ms-overflow-style: none;
`;
const AppLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  border-bottom: 1px solid var(--color-grey-100);
`;
const Cotainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <AppLayoutStyled>
      <Header />
      <Sidebar />
      <Main>
        <Cotainer>
          <Outlet />
        </Cotainer>
      </Main>
    </AppLayoutStyled>
  );
}

export default AppLayout;
