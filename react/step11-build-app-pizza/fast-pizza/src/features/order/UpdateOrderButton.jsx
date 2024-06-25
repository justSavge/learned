import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
import { useFetcher } from "react-router-dom";

function UpdateOrderButton() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      {/* 当像后端发出申请为patch自然会有 */}
      <Button type="primary">花钱加入优先派送</Button>
    </fetcher.Form>
  );
}

export default UpdateOrderButton;
export async function action({ request, params }) {
  const data = { priority: true };
  console.log(params);
  await updateOrder(params.orderId, data); //其实也就是一个fetch操作函数
  return null;
}
