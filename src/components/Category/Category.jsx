import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';

import Poster from '../Poster/Poster';

import styles from './category.module.scss';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

function Category() {
	const { id } = useParams();
	const { list } = useSelector(({ categories }) => categories);

	const defaultValues = {
		price_min: '',
		price_max: '',
		title: '',
	};

	const defaultParams = {
		categoryId: id,
		limit: 6,
		offset: 0,
		...defaultValues,
	};

	const [isEnd, setEnd] = useState(false);
	const [params, setParams] = useState(defaultParams);
	const [values, setValues] = useState(defaultValues);
	const [items, setItems] = useState([]);
	const [cat, setCat] = useState(null);

	const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

	useEffect(() => {
		if (!id) return;

		setItems([]);
		setEnd(false);
		setParams({ ...defaultParams, categoryId: id });
		setValues(defaultValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		if (!id || !list.length) return;
		const currCat = list.find((item) => item.id === id * 1);
		setCat(currCat);
	}, [id, list]);

	useEffect(() => {
		if (isLoading) return;
		if (!data.length) return;
		if (data.length < 6) setEnd(true);
		setItems((_items) => [..._items, ...data]);
	}, [data, isLoading]);

	const handleResset = () => {
		setValues({
			price_min: '',
			price_max: '',
			title: '',
		});
		setEnd(true);
	};

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
		setEnd(false);
		setParams({ ...params, ...values });
		setItems([]);
	};

	const handleSubmit = (e) => {
		if (e) {
			e.preventDefault();
		}
	};

	console.log(values);
	console.log(values, params);
	console.log({ ...params, ...values });
	return (
		<>
			<Poster />
			<section className={styles.category}>
				<form onSubmit={handleSubmit}>
					<label>
						<input
							type="text"
							name="title"
							placeholder="Product name"
							onChange={handleChange}
							value={values.title}
						/>
					</label>
					<label>
						<input
							type="number"
							name="price_min"
							onChange={handleChange}
							value={values.price_min}
							placeholder="0"
						/>
						<span>min-price</span>
					</label>
					<label>
						<input
							type="number"
							name="price_max"
							onChange={handleChange}
							value={values.price_max}
							placeholder="0"
						/>
						<span>max-price</span>
					</label>
					<button hidden />
				</form>

				{isLoading ? (
					<div>Loading...</div>
				) : !isSuccess || !items.length ? (
					<div>
						<span>No ressults in {cat?.name}</span>
						<button
							className="button"
							onClick={handleResset}
						>
							Reset
						</button>
					</div>
				) : (
					<Products
						title={cat?.name}
						products={items}
						amount={items.length}
					/>
				)}

				{!isEnd && (
					<div className={styles.button}>
						<button
							className="button"
							onClick={() =>
								setParams({ ...params, offset: params.offset + params.limit })
							}
						>
							See more
						</button>
					</div>
				)}
			</section>
		</>
	);
}

export default Category;
