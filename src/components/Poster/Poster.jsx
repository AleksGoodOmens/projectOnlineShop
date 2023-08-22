import React from 'react';

import styles from './poster.module.scss';
import laptop from './imgs/pavilion-laptop-front-view-gears-of-war-4-james-pc-computer-electronics-person-transparent-png-151342-removebg-preview.png';

const data = {
	title_bg: 'big sale 20%',
	title: 'the bestseller of 2023',
	productName: 'lennon r2d2 with nvidia 5090 ti',
	img: laptop,
};

function Poster() {
	return (
		<section className={`${styles.poster}`}>
			<div className={styles.wrapper}>
				<h1>{data.title_bg}</h1>
				<div className="row">
					<div className={`${styles.content} col`}>
						<h3>{data.title}</h3>
						<div>{data.productName}</div>
						<button className="button">Shop now</button>
					</div>
					<div className={`${styles.img} col`}>
						<img
							src={data.img}
							alt={data.title}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Poster;
