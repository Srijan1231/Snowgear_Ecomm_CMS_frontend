import { toast } from "react-toastify";
import {
  deletePaymentOption,
  getPaymentOptions,
  postNewPaymentOption,
  updatePaymentOption,
} from "../../helper/axios";
import { setPayment } from "./paymentSlice";

export const postNewPayAction = (obj) => async (dispatch) => {
  const { status, message } = await postNewPaymentOption(obj);

  toast[status](message);

  if (status === "success") {
    //call the api to fetch all the cats and mount in the state
    dispatch(getPayAction());
  }
};
export const getPayAction = () => async (dispatch) => {
  const { status, result } = await getPaymentOptions();

  if (status === "success") {
    // mount in the state
    dispatch(setPayment(result));
  }
};
export const updatePaymentAction = (obj) => async (dispatch) => {
  const respPending = updatePaymentOption(obj);
  toast.promise(respPending, {
    pending: "please wait....",
  });

  const { status, message } = await respPending;

  toast[status](message);

  if (status === "success") {
    //call the api to fetch all the cats and mount in the state
    dispatch(getPayAction());
  }
};
export const deletePaymentAction = (_id) => async (dispatch) => {
  const respPending = deletePaymentOption(_id);
  toast.promise(respPending, {
    pending: "please wait....",
  });

  const { status, message } = await respPending;

  toast[status](message);

  if (status === "success") {
    //call the api to fetch all the cats and mount in the state
    dispatch(getPayAction());
  }
};
