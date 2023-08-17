import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants';
import { shuffle } from '../../utils/common';

export const getProducts = createAsyncThunk(
	'categories/getProducts',
	async (_, thunkAPI) => {
		try {
			const response = await fetch(`${BASE_URL}/products`);
			const data = await response.json();
			return data;
		} catch (err) {
			console.log(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		list: [],
		filtered: [],
		related: [],
		isLoading: false,
	},
	reducers: {
		getRelatedProducts: (state, { payload }) => {
			const list = state.list.filter(({ category: { id } }) => id === payload);
			state.related = shuffle(list);
		},

		filteredByPrice: (state, { payload }) => {
			state.filtered = state.list.filter(({ price }) => price < payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.list = action.payload;
			state.isLoading = false;
		});
		builder.addCase(getProducts.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { filteredByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;
