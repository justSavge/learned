// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotal } from "../cart/cartSlice";
import store from "../../store/store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const isSubmiting = navigation === "submitting";
  const formError = useActionData(); //获得错误数据
  const cart = useSelector(getCart);
  const allPrice = useSelector((state) => getTotal(state, "totalPrice"));
  const dispatch = useDispatch();
  const isLoadingAddress = addressStatus === "loading";
  // console.log(allPrice);
  return (
    <div className=" px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">准备好了吗? Let's go!</h2>

      <Form method="post">
        {/* 提供了一个不会自动跳转的form以及许多有趣的功能 */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-20 sm:text-xl">名字</label>
          <input
            type="text"
            name="customer"
            required
            className="input  grow"
            defaultValue={userName}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-20 sm:text-xl">电话</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />

            {formError?.phone && (
              <p className="mt-1 rounded-md bg-red-100 text-center text-sm text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-20 sm:text-xl">地址</label>

          <div className="grow">
            <input
              type="text"
              className="input w-full"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {addressError && (
              <p className=" mt-2 bg-red-400 py-2 text-center">
                {addressError}
              </p>
            )}
            {!position.latitude && !position.longitude && (
              <span className=" absolute right-0 top-[-2px]">
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  点击获取地理位置
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
            className="focus:ring-offset-2; my-6 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <label htmlFor="priority" className=" font-semibold">
            想要提升你的优先级?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude} ${position.longitude}`
                : ""
            }
          />
          {/* 使用这些小把戏来减少工作量 */}
          <Button disable={isSubmiting} type="primary">
            {isSubmiting
              ? "提交中..."
              : `提交订单$${allPrice ? allPrice : ":("}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData(); //这里是浏览器提供的api
  const data = Object.fromEntries(formData); //这个方法用于将键值对数组[['key','val']]转换为对象{key:val}
  // console.log(data);
  store.dispatch(clearCart()); //为了在非组件当中使用clearCart(),这样是最笨拙却无可奈何的办法
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  const error = {};
  if (!isValidPhone(order.phone)) {
    error.phone =
      "请输入正确的电话号码，这对我们很重要，如遇到特殊情况我们需要联系你";
  }
  // return null;
  if (Object.keys(error).length > 0) return error;
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`); //react-router-dom提供的用来重定位跳转到url的，似乎node还是js的哪个也提供了类似（？一样的
}
export default CreateOrder;
