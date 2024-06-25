import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const disPatch = useDispatch();
  const handleDelete = function () {
    disPatch(deleteItem(pizzaId));
  };
  return (
    <li className="py-3 sm:flex sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className=" text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <Button type="small" onClick={handleDelete}>
          删除订单
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
