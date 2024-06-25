import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotal } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const allQuantity = useSelector((state) => getTotal(state, "quantity"));
  const allPrice = useSelector((state) => getTotal(state, "totalPrice"));
  if (!allQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-stone-200">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{allQuantity} pizzas</span>
        <span>{formatCurrency(allPrice)}</span>
      </p>
      <Link to="/cart">打开订单页 &rarr;</Link>
    </div>
  );
}

export default CartOverview;
