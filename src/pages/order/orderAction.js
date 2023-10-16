import { getOrders } from "../../helper/axios";
import { setOrder } from "./orderSlice";

export const getOrderAction = () => async (dispatch) => {
  const { status, result } = await getOrders();

  if (status === "success") {
    // mount in the state
    dispatch(setOrder(result));
  }
};
