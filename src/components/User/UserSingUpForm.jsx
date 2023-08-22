import React, { useState } from 'react';

import styles from './userSingUpForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, toggleFormType } from '../../features/userSlice/userSlice';

function UserSingUpForm({ handleClose }) {
	const { showForm } = useSelector(({ user }) => user);

	const dispatch = useDispatch();

	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		avatar: '',
	});

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const isEmpty = Object.values(values).some((val) => !val);
		if (isEmpty) {
			// I can add something to show that form is empty
			return;
		}
		dispatch(createUser(values));

		handleClose(false);
	};

	const handleChangeFormType = () => {
		dispatch(toggleFormType('login'));
	};

	return (
		<>
			<div className={`${styles.body} ${showForm && styles.active}`}>
				<h3>
					sing up <button onClick={handleClose}>X</button>
				</h3>
				<form onSubmit={handleSubmit}>
					<label>
						<input
							type="email"
							name="email"
							placeholder="Your email"
							value={values.email}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						<input
							type="name"
							name="name"
							placeholder="Your name"
							value={values.name}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						<input
							type="password"
							name="password"
							placeholder="Your password"
							value={values.password}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						<input
							type="text"
							name="avatar"
							placeholder="Your avatar"
							value={values.avatar}
							onChange={handleChange}
							required
						/>
					</label>
					<div onClick={handleChangeFormType}>I already have an account</div>
					<button className="button">create an account</button>
				</form>
			</div>
		</>
	);
}

export default UserSingUpForm;
