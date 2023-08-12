import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./pages/category/categorySlice";
import systemReducer from "./system/systemSlice";
import adminReducer from "./pages/signin-signup/adminSlice";
import paymentReducer from "./pages/payment-option/paymentSlice";
import productReducer from "./pages/product/productSlice";

export default configureStore({
  reducer: {
    catInfo: catReducer,
    system: systemReducer,
    adminInfo: adminReducer,
    paymentInfo: paymentReducer,
    productInfo: productReducer,
  },
});
