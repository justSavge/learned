import styled, { css } from "styled-components";

const cool = css`
  text-align: center;
`; //css只为了语法提示，删除也无妨
const Heading = styled.h1`
  ${(props) =>
    props.type === "big" &&
    css`
      font-size: large;
    `}
  font-size: 5rem;
  &:hover {
    background-color: var(--color-brand--600);
  }
  ${cool}
`;

export default Heading;
