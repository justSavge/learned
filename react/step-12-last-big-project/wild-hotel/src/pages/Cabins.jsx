import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">所有房间</Heading>
        <p>排序/过滤</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <AddCabin />
    </>
  );
}

export default Cabins;
