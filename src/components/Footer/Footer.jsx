import React from 'react'
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {AiOutlineInstagram, AiOutlineFacebook, AiOutlineYoutube} from "react-icons/ai"

import { ROUTES } from "../../utils/routes";


import styles from "./footer.module.css"



function Footer() {
	return (
		<footer className='container mt-4'>
			<section className={`${styles.footer} row `}>
				<Col className={styles.logo}>
					<Link to={ROUTES.HOME}>
						<img width={"100%"} height={"100%"} src="https://www.freeiconspng.com/thumbs/logo-design/rainbow-logo-design-transparent-0.png" alt="logo" />
					</Link>
				</Col>
				<Col className={styles.developer}>
					Developed by <a href="https://webdeveloperaleks.com/"> Aleks GoodOmens </a>
				</Col>
				<Col className={styles.icons}>
					<a href="https://www.instagram.com/"><AiOutlineInstagram/></a>
					<a href="https://www.facebook.com/"><AiOutlineFacebook/></a>
					<a href="https://www.youtube.com/"><AiOutlineYoutube/></a>
				</Col>
			</section>
		</footer>
	)
}

export default Footer