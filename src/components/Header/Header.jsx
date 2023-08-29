import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
	AiOutlineSearch,
	AiOutlineShoppingCart,
	AiOutlineHeart,
} from 'react-icons/ai';

import styles from './header.module.scss';
import { ROUTES } from '../../utils/routes';
import { toggleForm } from '../../features/userSlice/userSlice';
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../features/api/apiSlice';

function Header() {
	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		name: 'Guest',
		avatar:
			'https://www.freeiconspng.com/thumbs/logo-design/rainbow-logo-design-transparent-0.png',
	});

	const [searchValue, setSearchValue] = useState('');
	const handleSearch = ({ target: { value } }) => {
		setSearchValue(value);
		console.log(searchValue);
	};
	const { data, isLoading } = useGetProductsQuery({ title: searchValue });

	const dispatch = useDispatch();
	const { currentUser, cart } = useSelector(({ user }) => user);

	useEffect(() => {
		if (currentUser) {
			if (!currentUser.message) {
				setUserData(currentUser);
			}
		}
	}, [currentUser]);

	const handleClick = () => {
		if (!currentUser) dispatch(toggleForm(true));
		navigate(ROUTES.PROFILE);

		return;
	};

	console.log(cart.length ? true : false);
	return (
		<div className="fixed">
			<header className={`${styles.header} container`}>
				<section className={styles.left}>
					<Link
						to={ROUTES.HOME}
						className={styles.logo}
					>
						staff shop
						{/* <img
								width={'100%'}
								height={'100%'}
								src="https://www.freeiconspng.com/thumbs/logo-design/rainbow-logo-design-transparent-0.png"
								alt="logo"
							/> */}
					</Link>
					<button
						onClick={handleClick}
						className={styles.user}
					>
						<div className={styles.user__img}>
							<img
								src={userData.avatar}
								alt={userData.name}
							/>
						</div>
						<span>{userData.name}</span>
					</button>
				</section>

				<section className={styles.right}>
					<form className={styles.form}>
						<label>
							<AiOutlineSearch />
							<input
								type="search"
								name="search"
								id="search"
								placeholder="Search for anything..."
								onChange={handleSearch}
								value={searchValue}
							/>
						</label>
						{searchValue && (
							<ul className={styles.items}>
								{isLoading ? (
									'Loading'
								) : !data.length ? (
									<li>No items found</li>
								) : (
									data.map((item) => (
										<li
											onClick={() => setSearchValue('')}
											key={item.title}
										>
											<Link to={`products/${item.id}`}>
												<div>
													<img
														src={item.images[0]}
														alt={item.title}
													/>
												</div>
												<h3>{item.title}</h3>
											</Link>
										</li>
									))
								)}
							</ul>
						)}
					</form>
					<div className={styles.icons}>
						<Link
							className={styles.icon}
							to={ROUTES.FAVORITE}
						>
							<AiOutlineHeart />
						</Link>
						<Link
							to={ROUTES.CART}
							className={styles.icon}
						>
							<AiOutlineShoppingCart />
							{cart.length ? (
								<div className={styles.amount}>{cart.length}</div>
							) : (
								''
							)}
						</Link>
					</div>
				</section>
			</header>
		</div>
	);
}

export default Header;
