import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import HandQuantityButton from "../../ui/HandQuantityButton";
import { getPizzaById } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const disPatch = useDispatch();
  const choosePizza = useSelector((state) => getPizzaById(state, id));
  // console.log(choosePizza);
  const handleOrder = function () {
    const newPizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };
    disPatch(addItem(newPizza));
  };

  return (
    <li className="flex gap-4 pt-0.5">
      <img
        src={imageUrl}
        alt={name}
        className={`h-28 ${soldOut ? "opacity-40" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className=" text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex justify-between text-sm font-medium text-stone-500">
          {!soldOut ? (
            <>
              <p>{formatCurrency(unitPrice)}</p>

              {choosePizza?.quantity ? (
                <div className="flex items-center gap-5">
                  <HandQuantityButton pizzaId={id} option="plus" />
                  {choosePizza.quantity}
                  <HandQuantityButton
                    pizzaId={id}
                    option="reduce"
                    quantity={choosePizza.quantity}
                  />
                </div>
              ) : (
                <Button type="small" onClick={handleOrder}>
                  加入订单
                </Button>
              )}
            </>
          ) : (
            <p>售罄</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
