import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h4">删除{resourceName}</Heading>
      <p>你确定要删除{resourceName}吗?如果是，请点击确认。</p>

      <div>
        <Button
          variations="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          取消
        </Button>
        <Button variations="danger" disabled={disabled} onClick={onConfirm}>
          删除
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
