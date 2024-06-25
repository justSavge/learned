import GlobalStyles from "./styles/GlobalStyled";
import styled from "styled-components";
import H1 from "./ui/HeadText";
import Row from "./ui/Row";
import Button from "./ui/Button";

const StyledApp = styled.div`
  display: flex;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <H1 as="h1">龙门酒店</H1>
            <div>
              <H1>in or out</H1>
              <Button variations="primary" sizes="large">
                in
              </Button>
              <Button variations="primary" sizes="large">
                out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <H1 as="h3">Form</H1>
            <form>
              <input type="text" name="" id="" placeholder="123" />
              <input type="text" name="" id="" placeholder="123" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;

//styled-component的优势：
//1.不会再全局中使用造成污染，在渲染以后展示的是一个原标签+不会重复的类名
//2.原来的属性如onClick,type都可以直接正常的使用
//3.方便的使用props（特例：提供了as，可以快速传入标签名） 如： ${(props) =>props.nickname === "james" &&cssbackground-color: pink;`}
//&选择自己
//注意，名字可以随意写，但一般用首字母大写来方便使用
//导出作为全局变量的使用方式如下，注意，不接受children props，而是放在最上方
//其实最好还是使用原生css而不是使用js导入-
