const initialValueCustomer = {
  fullName: "",
  nationId: "",
  createAt: "",
};
export function reducerCustomer(state = initialValueCustomer, action) {
  switch (action.type) {
    case "customer/createAccount":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationId: action.payload.nationId,
        createAt: action.payload.createAt,
      };
    case "customer/updateAccount":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}
export function createAccount(fullName, nationId) {
  return {
    type: "customer/createAccount",
    payload: {
      fullName,
      nationId,
      createAt: new Date().toLocaleString(),
    },
  };
}
export function updateAccount(fullName) {
  return {
    type: "customer/updateAccount",
    payload: {
      fullName,
    },
  };
}
