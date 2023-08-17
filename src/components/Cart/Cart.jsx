import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './cart.module.scss';
import {
	addItemToCart,
	removeItemFromCart,
} from '../../features/userSlice/userSlice';

function Cart() {
	const { cart } = useSelector(({ user }) => user);

	const dispatch = useDispatch();

	const handleQuantity = (item, quantity) => {
		dispatch(addItemToCart({ ...item, quantity }));
	};

	const handleRemoveItem = (id) => {
		dispatch(removeItemFromCart(id));
	};
	return (
		<section className={styles.cart}>
			<div className={styles.cart__wrapper}>
				<h1>Cart of userName</h1>
				{!cart.length ? (
					<div>no items in your cart</div>
				) : (
					<ul className={styles.list}>
						{cart.map((item) => {
							const { title, category, images, price, id, quantity } = item;

							return (
								<li key={id}>
									<section className={styles.list__item}>
										<div className={styles.picture}>
											<img
												src={images[0]}
												alt={title}
											/>
										</div>
										<section className={styles.info}>
											<h3>{title}</h3>
											<p>{category.name}</p>
										</section>
									</section>

									<section className={styles.list__item}>
										<section className={styles.price}>£ {price}</section>

										<section className={styles.quantity}>
											<button
												onClick={() =>
													handleQuantity(item, Math.max(1, quantity - 1))
												}
												className="button"
											>
												-
											</button>
											<span>{quantity}</span>
											<button
												className="button"
												onClick={() =>
													handleQuantity(item, Math.max(1, quantity + 1))
												}
											>
												+
											</button>
										</section>

										<section className={styles.price}>
											£ {quantity * price}
										</section>
										<button
											className="button"
											onClick={() => handleRemoveItem(item.id)}
										>
											X
										</button>
									</section>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</section>
	);
}

export default Cart;
