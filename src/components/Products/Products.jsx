import React from 'react';
import { Link } from 'react-router-dom';

import stylesies from './products.module.scss';

function Products({ title, styles = {}, products = [], amount }) {
	const list = products.filter((_, i) => i < amount);

	return (
		<section className="grid_12">
			{title && <h2>{title}</h2>}
			<div className="row g-3">
				{list.map(({ id, images, title, category: { name: cat }, price }) => (
					<div
						key={id}
						className={amount <= 5 ? 'col' : 'col-xl-2 col-md-4 col-sm-6'}
					>
						<Link
							to={`/products/${id}`}
							className={stylesies.item}
						>
							<div
								className={stylesies.item__img}
								style={{ backgroundImage: `url(${images})` }}
							></div>
							<div className={stylesies.item__body}>
								<h3>{title}</h3>
								<div className={stylesies.item__subtitle}>{cat}</div>
								<div className={stylesies.item__wrapper}>
									<span className={stylesies.item__prices}>
										<span>{price} £</span>
										<span>{Math.floor(price * 1.2)} £</span>
									</span>
									<span>{Math.floor(Math.random() * 20 + 1)} purchased</span>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}

export default Products;
