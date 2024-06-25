import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function fetchAddress() {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address }; //这里作为action.payload
  },
);
//注意这里的reduxjs/toolkit使用的中间件逻辑十分混乱，只要会用就行，熟悉以后再做他说
const initial = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initial,
  reducers: {
    createUser(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        //pending,悬而未决的，status是用来及时了解执行情况的
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        //fulfilled，完成了
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});
export const { createUser } = userSlice.actions;
export default userSlice.reducer;
