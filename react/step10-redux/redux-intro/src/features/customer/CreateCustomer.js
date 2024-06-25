import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  function handleClick() {
    if (!fullName || !nationalId) return;
    console.log(123);
    dispatch(createAccount(fullName, nationalId));
    // console.log(state);
  }
  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
