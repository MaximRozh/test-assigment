import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatedCartItems } from "../lib/utils";

import type { AppState, AppThunk } from "./index";
// import { fetchCount } from "./counterAPI";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
  cartItems: any;
  showCart: boolean;
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
  cartItems: [],
  showCart: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    addProductToCart: (state, action: PayloadAction<any>) => {
      state.cartItems = updatedCartItems(state.cartItems, action.payload);
    },
    updateCart: (state, action: PayloadAction<any>) => {
      state.cartItems = action.payload;
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      state.cartItems = state.cartItems.filter(
        (item: any) => item._id !== action.payload
      );
    },
    openCart: (state) => {
      state.showCart = true;
    },
    closeCart: (state) => {
      state.showCart = false;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, (state) => {
  //         state.status = "loading";
  //       })
  //       .addCase(incrementAsync.fulfilled, (state, action) => {
  //         state.status = "idle";
  //         state.value += action.payload;
  //       });
  //   },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  addProductToCart,
  openCart,
  closeCart,
  updateCart,
  removeFromCart,
} = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: AppState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default cartSlice.reducer;
