import Heading from "../ui/Heading";
import Ps from "../ui/Ps";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <Row type="horizontal">
      <Heading as="h1">主页</Heading>
      <Ps/>
    </Row>
  );
}

export default Dashboard;
