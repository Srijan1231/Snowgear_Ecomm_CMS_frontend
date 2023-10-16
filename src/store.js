import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./pages/category/categorySlice";
import systemReducer from "./system/systemSlice";
import adminReducer from "./pages/signin-signup/adminSlice";
import opReducer from "./pages/payment-option/poSlice";
import productReducer from "./pages/product/productSlice";
import orderReducer from "./pages/order/orderSlice";

export default configureStore({
  reducer: {
    catInfo: catReducer,
    system: systemReducer,
    adminInfo: adminReducer,
    poInfo: opReducer,
    productInfo: productReducer,
    orderInfo: orderReducer,
  },
});
