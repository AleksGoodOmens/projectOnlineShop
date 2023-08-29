import React from 'react';

import styles from './sidebar.module.scss';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SkeletonSideBar from './SkeletonSideBar';

function Sidebar({ id }) {
	const { list } = useSelector(({ categories }) => categories);
	return (
		<div className={`${styles.sidebar}`}>
			<h2 className={styles.title}>categories</h2>
			<nav>
				<ul className={styles.list}>
					{list.length ? (
						list.map((cat) => (
							<li key={cat.id}>
								<NavLink
									className={({ isActive, isPending }) =>
										isPending ? styles.pending : isActive ? styles.active : ''
									}
									to={`/categories/${cat.id}`}
								>
									{cat.name}
								</NavLink>{' '}
							</li>
						))
					) : (
						<>
							<li>No categories</li>
						</>
					)}
				</ul>
			</nav>

			<div className={styles.footer}>
				<a
					href={'/help'}
					target="_blank"
					className={styles.link}
					rel="noreferrer"
				>
					help
				</a>
				<a
					href={'/terms'}
					target="_blank"
					className={styles.link}
					rel="noreferrer"
				>
					terms and conditions
				</a>
			</div>
		</div>
	);
}

export default Sidebar;
