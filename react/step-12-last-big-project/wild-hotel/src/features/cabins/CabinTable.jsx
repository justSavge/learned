import styled from "styled-components";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useGetAllCabins } from "./useGetAllCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function CabinTable() {
  const { isLoading, cabins, error } = useGetAllCabins();
  //使用了useQuery，这里会自动执行
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>客房</div>
          <div>容量</div>
          <div>价格</div>
          <div>折扣</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
