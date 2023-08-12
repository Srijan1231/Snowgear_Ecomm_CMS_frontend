import { deleteProduct, getProduct, postNewProduct } from "../../helper/axios";
import { toast } from "react-toastify";
import { setProducts } from "./productSlice";

export const postNewProductAction = (data) => async (dispatch) => {
  const pending = postNewProduct(data);
  console.log(data);
  toast.promise(pending, {
    pending: "Please Wait....",
  });
  const { status, message } = await pending;
  toast[status](message);
  if (status === "success") {
    dispatch(getProductAction());
  }
};
export const getProductAction = () => async (dispatch) => {
  const { status, products } = await getProduct();
  console.log(products);
  if (status === "success") {
    dispatch(setProducts(products));
  }
};
export const deleteProductAction = (_id) => async (dispatch) => {
  const pending = deleteProduct(_id);

  toast.promise(pending, {
    pending: "Please Wait....",
  });
  const { status, message } = await pending;
  toast[status](message);
  if (status === "success") {
    dispatch(getProductAction());
  }
};
