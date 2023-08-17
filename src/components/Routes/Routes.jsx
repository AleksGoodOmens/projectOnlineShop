import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import { ROUTES } from '../../utils/routes';
import ProductPage from '../ProductPage/ProductPage';
import Profile from '../Profile/Profile';
import Category from '../Category/Category';
import Cart from '../Cart/Cart';

function AppRoutes() {
	return (
		<Routes>
			<Route
				index
				element={<Home />}
			/>
			<Route
				path={ROUTES.PRODUCT}
				element={<ProductPage />}
			/>
			<Route
				path={ROUTES.CATEGORY}
				element={<Category />}
			/>
			<Route
				path={ROUTES.PROFILE}
				element={<Profile />}
			/>
			<Route
				path={ROUTES.CART}
				element={<Cart />}
			/>
		</Routes>
	);
}

export default AppRoutes;
