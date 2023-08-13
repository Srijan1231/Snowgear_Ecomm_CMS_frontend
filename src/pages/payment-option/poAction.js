import { toast } from "react-toastify";
import {
  deletePO,
  getNewPOs,
  postNewPO,
  updateNewPOs,
} from "../../helper/axios";
import { setPaymentOptions } from "./poSlice";
import { setModalShow } from "../../system/systemSlice";

export const addNewPOAction = (data) => async (dispatch) => {
  const { status, message } = await postNewPO(data);

  toast[status](message);

  status === "success" && dispatch(getOPsAction());
};

export const getOPsAction = () => async (dispatch) => {
  const { status, result = [] } = await getNewPOs();

  status === "success" && dispatch(setPaymentOptions(result));
};

export const updatePOsAction = (data) => async (dispatch) => {
  const pending = updateNewPOs(data);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  status === "success" && dispatch(getOPsAction());
};

export const deletePOsAction = (_id) => async (dispatch) => {
  const pending = deletePO(_id);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  status === "success" && dispatch(getOPsAction());
  dispatch(setModalShow(false));
};
