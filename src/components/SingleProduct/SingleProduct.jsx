import React, { useEffect, useState } from 'react';

import styles from './singleProduct.module.scss';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/userSlice/userSlice';

function SingleProduct(item) {
	const { description, images, price, title, size = ['4', '4.5', '5'] } = item;
	const dispatch = useDispatch();

	const [currentImage, setCurrentImage] = useState();
	const [currentSize, setCurrentSize] = useState();

	useEffect(() => {
		setCurrentImage(images[0]);
	}, [images]);
	const addToCart = () => {
		dispatch(addItemToCart(item));
	};

	return (
		<section className={styles.section}>
			<div className={styles.images}>
				<div className={`${styles.images__main_img} opacity`}>
					<img
						src={currentImage}
						alt={title}
					/>
				</div>
				{
					<div className={styles.images__imgs}>
						{images.map((img, i) => (
							<div
								className={styles.images__img_item}
								key={i}
							>
								<img
									src={img}
									alt={title}
									onClick={() => setCurrentImage(img)}
								/>
							</div>
						))}
					</div>
				}
			</div>
			<div className={styles.body}>
				<h1>{title}</h1>
				<div className={styles.description}>{description}</div>
				<div>
					<span className="color-secondary">color:</span> grey
				</div>
				<div className={styles.sizes}>
					<div className="color-secondary">size: </div>
					{size.map((item, k) => (
						<span
							className={`${
								currentSize === size[k] ? styles.sizes__active : ''
							}`}
							onClick={() => setCurrentSize(item)}
							key={k}
						>
							{item}
						</span>
					))}
				</div>
				<div>£{price}</div>
				<div className={styles.buttons}>
					<button
						disabled={!currentSize}
						onClick={addToCart}
						className="button"
					>
						Add to cart
					</button>{' '}
					<button className="button">Add to favorites</button>
				</div>
			</div>
		</section>
	);
}

export default SingleProduct;
