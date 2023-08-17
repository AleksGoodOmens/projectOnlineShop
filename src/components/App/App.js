import Header from '../Header/Header';
import AppRoutes from '../Routes/Routes';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../features/categories/categoriesSlice';
import { getProducts } from '../../features/products/productsSlice';
import UserLoginOrSingUp from '../User/UserLoginOrSingUp';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<div className="app">
			<Header className="header" />
			<main className="container">
				<div className="grid">
					<Sidebar />
					<AppRoutes />
				</div>
			</main>
			<Footer />
			<UserLoginOrSingUp />
		</div>
	);
}

export default App;
