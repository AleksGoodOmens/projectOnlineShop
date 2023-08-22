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
					<article
						key={id}
						className="col"
					>
						<Link
							className={styles.item}
							to={`/categories/${id}`}
						>
							<div
								className={styles.item__img}
								style={{ backgroundImage: `url(${image})` }}
							/>
							<h3>{name}</h3>
						</Link>
					</article>
				))}
			</div>
		</section>
	);
}

export default Categories;
