import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
	AiOutlineSearch,
	AiOutlineShoppingCart,
	AiOutlineHeart,
} from 'react-icons/ai';

import styles from './header.module.css';
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
		<header className="container-fluid header">
			<Row
				gap={'2em'}
				className={`${styles.header} align-items-center`}
			>
				<Col
					sm={3}
					className={styles.logo}
				>
					<Link to={ROUTES.HOME}>
						<img
							width={'100%'}
							height={'100%'}
							src="https://www.freeiconspng.com/thumbs/logo-design/rainbow-logo-design-transparent-0.png"
							alt="logo"
						/>
					</Link>
				</Col>
				<Col sm={9}>
					<Row>
						<Col>
							<button
								onClick={handleClick}
								className={styles.user}
							>
								<img
									width={'50px'}
									src={userData.avatar}
									alt={userData.name}
								/>
								<span>{userData.name}</span>
							</button>
						</Col>
						<Col>
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
						</Col>

						<Col className={styles.icons}>
							<div className={styles.icon}>
								<AiOutlineHeart />
							</div>
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

								{/* {cart.length && (
									<div className={styles.amount}>{cart.length}</div>
								)} */}
							</Link>
						</Col>
					</Row>
				</Col>
			</Row>
		</header>
	);
}

export default Header;
