import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoCopy } from "react-icons/io5";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [isEdit, setIsEdit] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  //和useQuery不同的是，useMutation提供了mutate,使得这个函数为可操作函数，便于绑定点击事件
  //useQueryClient,目前来看，只使用了invalidateQueries来令qerykey过期来更新，事实上肯定有更多的作用
  //全局绑定QueryClientProvider，过期时间修改QueryClient，
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  const handleCopy = function () {
    console.log(image);
    createCabin({
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
      name: `${name}的副本`,
    });
  };
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>最多可住下{maxCapacity}人</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? formatCurrency(discount) : <span>-</span>}
      </Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<CiEdit />}>修改</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<MdDeleteForever />}>删除</Menus.Button>
              </Modal.Open>
              <Menus.Button icon={<IoCopy />} onClick={handleCopy}>
                复制
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name="edit">
            <CreateCabinForm currentCabin={cabin} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="客房"
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
