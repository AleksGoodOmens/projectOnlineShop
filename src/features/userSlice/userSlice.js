import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants';

export const createUser = createAsyncThunk(
	'users/createUser',
	async (payload, thunkAPI) => {
		try {
			const res = await fetch(`${BASE_URL}/users`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(payload),
			});
			let result = await res.json();
			return result;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const logInUser = createAsyncThunk(
	'users/logInUser',
	async (payload, thunkAPI) => {
		try {
			const res = await fetch(`${BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(payload),
			});

			let result = await res.json();

			const login = await fetch(`${BASE_URL}/auth/profile`, {
				headers: {
					Authorization: `Bearer ${result.access_token}`,
				},
			});

			const loginData = await login.json();

			return loginData;
		} catch (err) {
			console.log('error');
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (payload, thunkAPI) => {
		try {
			const res = await fetch(`${BASE_URL}/users/${payload.id}`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(payload),
			});

			let result = await res.json();
			console.log(result);
			return result;
		} catch (err) {
			console.log('error');
			return thunkAPI.rejectWithValue(err);
		}
	}
);

const addCurrentUser = (state, { payload }) => {
	if (payload.name) {
		state.currentUser = payload;
		state.logged = true;
	}
	if (payload.message) {
		state.logged = payload.message;
	}
};

const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		logged: null,
		cart: [],
		isLoading: false,
		formType: 'signup',
		showForm: false,
	},
	reducers: {
		addItemToCart: (state, { payload }) => {
			let newCart = [...state.cart];
			const found = state.cart.find(({ id }) => id === payload.id);

			if (found) {
				newCart = newCart.map((item) => {
					return item.id === payload.id
						? {
								...item,
								quantity: payload.quantity || item.quantity + 1,
						  }
						: item;
				});
			} else newCart.push({ ...payload, quantity: 1 });

			state.cart = newCart;
		},

		removeItemFromCart: (state, { payload }) => {
			state.cart = state.cart.filter(({ id }) => id !== payload);
			console.log(
				payload,
				state.cart.filter(({ id }) => id !== payload.id)
			);
		},

		toggleForm: (state, { payload }) => {
			state.showForm = payload;
		},

		toggleFormType: (state, { payload }) => {
			state.formType = payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(createUser.fulfilled, addCurrentUser);
		builder.addCase(logInUser.fulfilled, addCurrentUser);
		builder.addCase(updateUser.fulfilled, addCurrentUser);
	},
});

export const { addItemToCart, toggleForm, toggleFormType, removeItemFromCart } =
	userSlice.actions;

export default userSlice.reducer;
