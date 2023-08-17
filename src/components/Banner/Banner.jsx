import React from 'react'

import styles from "./banner.module.scss"

const data = {
	bg: "https://pbs.twimg.com/media/Eg0SMrFWAAAIUU0.jpg:large",
	date: "Knowledge day",
	subtitle: "SALE",
}

function Banner() {
	return (
		<section className={`grid_12 ${styles.banner}`}>
			<div className={styles.banner__left}>
				<h2>{data.date}</h2>
				<h3>{data.subtitle}</h3>
				<button className='button'>see more</button>
			</div>
			<div className={styles.banner__right} style={{ backgroundImage: `url(${data.bg})`}}>
			</div>

		</section>
	)
}

export default Banner