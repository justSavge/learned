// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrderButton from "./UpdateOrderButton";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher(); //常用的获取数据的办法
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher],
  );
  // console.log(fetcher.data);
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">订单#{id} </h2>

        <div className="space-x-2">
          {priority && (
            <span className=" rounded-full bg-red-500 px-2 py-1 text-sm font-semibold text-white">
              优先级
            </span>
          )}
          <span className=" rounded-full bg-green-500 px-2 py-1 text-sm font-semibold text-white">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className=" font-medium">
          {deliveryIn >= 0
            ? `骑手还有 ${calcMinutesLeft(estimatedDelivery)} 分钟抵达本店 😃`
            : "订单已经派送中"}
        </p>
        <p className=" text-xs text-stone-500">
          (预计抵达时间: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="mb-7 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.name}
            detail={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
            isLoadingIngredients={fetcher.state === "loading"}
          ></OrderItem>
        ))}
      </ul>
      <div className=" scroll-py-2 bg-stone-200 px-6 py-5">
        <p className=" text-stone-500">
          披萨价格: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className=" text-stone-500">
            价格优先: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          货到付款: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <div className=" text-end">{!priority && <UpdateOrderButton />}</div>
    </div>
  );
}
export async function loader({ params }) {
  //为什么不使用useParams,因为hook只能在组件使用，这里是router-dom会传递一些参数，其中就有params
  // console.log(params);
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
