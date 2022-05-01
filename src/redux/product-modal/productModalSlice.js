import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	value: null,
};

const productSliceModel = createSlice({
	name: "productModel",
	initialState,
	reducers: {
		set(state, action) {
			state.value = action.payload;
		},
		remove(state, action) {
			state.value = null;
		},
	},
});

export const {set, remove} = productSliceModel.actions;
export default productSliceModel.reducer;
