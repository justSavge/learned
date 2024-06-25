import { useDispatch } from "react-redux";
import Button from "./Button";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "../features/cart/cartSlice";

function HandQuantityButton({ option, pizzaId, quantity }) {
  const disPatch = useDispatch();
  const handQuantity = function () {
    if (option === "plus") disPatch(increaseItemQuantity(pizzaId));
    if (option === "reduce") {
      disPatch(decreaseItemQuantity(pizzaId));
    }
  };
  return (
    <Button type="small" onClick={handQuantity}>
      {option === "plus" ? "+" : "-"}
    </Button>
  );
}

export default HandQuantityButton;
