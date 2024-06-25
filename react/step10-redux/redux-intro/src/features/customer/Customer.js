import { useSelector } from "react-redux";

function Customer() {
  const customerName = useSelector((store) => store.customer.fullName);
  const c = useSelector((store) => store);
  console.log(c);
  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
