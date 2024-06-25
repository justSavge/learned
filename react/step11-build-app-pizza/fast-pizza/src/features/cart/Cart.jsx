import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const userName = useSelector((state) => state.user.userName);
  const cart = useSelector(getCart);
  const disPatch = useDispatch();
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton linkTo="/menu">&larr; 返回菜单</LinkButton>

      <h2 className="mb-7 mt-2 text-xl font-semibold">
        你的订单详情, {userName}
      </h2>
      <ul className="mb-7 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.name}></CartItem>
        ))}
      </ul>
      <div className="mt-8 flex justify-between space-x-2">
        <Button to="/order/new" type="primary">
          完善你的订单才可以派送哦~
        </Button>

        <Button type="secondary" onClick={() => disPatch(clearCart())}>
          点击清空
        </Button>
      </div>
    </div>
  );
}

export default Cart;
