import React from 'react';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';

import {
	AiOutlineInstagram,
	AiOutlineFacebook,
	AiOutlineYoutube,
} from 'react-icons/ai';

import { ROUTES } from '../../utils/routes';

import styles from './footer.module.scss';

function Footer() {
	return (
		<footer className="footer mt-4">
			<div className={`${styles.footer} container`}>
				<Link
					className={styles.logo}
					to={ROUTES.HOME}
				>
					staff shop
				</Link>
				<div className={styles.developer}>
					Developed by{' '}
					<a href="https://webdeveloperaleks.com/"> Aleks GoodOmens </a>
				</div>
				<ul className={styles.icons}>
					<li>
						<a href="https://www.instagram.com/">
							<AiOutlineInstagram />
						</a>
					</li>
					<li>
						<a href="https://www.facebook.com/">
							<AiOutlineFacebook />
						</a>
					</li>
					<li>
						<a href="https://www.youtube.com/">
							<AiOutlineYoutube />
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
