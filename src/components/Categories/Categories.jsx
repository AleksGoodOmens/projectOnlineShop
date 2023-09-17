import React from 'react';
import { Link } from 'react-router-dom';

import styles from './categories.module.scss';

function Categories({ title, categories = [], amount }) {
	const list = categories.filter((_, i) => i < amount);

	return (
		<section className="grid-12">
			<h2>{title}</h2>
			<div className="row">
				{list.map(({ id, name, image }) => (
					<Link
						key={id}
						className={`${styles.item} col-12 col-sm-6 col-md-3`}
						to={`/categories/${id}`}
					>
						<div
							className={styles.item__img}
							style={{ backgroundImage: `url(${image})` }}
						/>
						<h3>{name}</h3>
					</Link>
				))}
			</div>
		</section>
	);
}

export default Categories;
