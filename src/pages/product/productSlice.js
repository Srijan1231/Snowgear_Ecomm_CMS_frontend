import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      if (state.products.length === 0 && payload.length === 0) {
        return;
      }
      state.products = payload;
    },
  },
});

const { reducer, actions } = productSlice;

export const { setProducts } = actions;

export default reducer;
