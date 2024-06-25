import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const storeUserName = useSelector((state) => state.user.userName);
  const disPatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    disPatch(createUser(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      {storeUserName ? (
        <Button to="/menu" type="primary">
          继续订餐吗，{storeUserName}
        </Button>
      ) : (
        <>
          <p>👋 欢迎! 请输入你的名字:</p>
          <input
            type="text"
            placeholder="你的名字将用于订单哟~"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input mb-8 w-72"
          />
        </>
      )}
      {username !== "" && (
        <div>
          {username && (
            <Button to="/menu" type="primary" onClick={handleSubmit}>
              点击开始订餐
            </Button>
          )}
        </div>
      )}
    </form>
  );
}

export default CreateUser;
