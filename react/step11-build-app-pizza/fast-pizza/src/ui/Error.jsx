import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();
  console.log(error.data);
  return (
    <div>
      <h1>出了些问题捏😢</h1>
      <p>
        {
          error.data || error.message //当fetch的网址有问题时没有data而是message
        }
      </p>
      <LinkButton linkTo="-1">&larr; 点击返回</LinkButton>
    </div>
  );
}

export default Error;
