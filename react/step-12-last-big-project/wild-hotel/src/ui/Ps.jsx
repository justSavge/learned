import styled from "styled-components";

const P = styled.p`
  font-size: 2rem;
  font-weight: 100;
  color: darkcyan;
  margin: 40px;
`;

function Ps() {
  return (
    <div>
      <P>仍在开发中</P>
      <P>Ps:</P>
      <P>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        本网站使用React搭建的单页式应用，使用react-router实现前端路由，使用context
        APi实现可读性优化，使用了高阶复合组件
      </P>
      <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;后端由suPabase快速搭建</P>
      <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;网站交由netlify托管</P>
    </div>
  );
}

export default Ps;
