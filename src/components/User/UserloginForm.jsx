import React, { useEffect, useState } from 'react';

import styles from './userSingUpForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, toggleFormType } from '../../features/userSlice/userSlice';

function UserloginForm({ handleClose }) {
	const { showForm, logged } = useSelector(({ user }) => user);

	const dispatch = useDispatch();

	const [values, setValues] = useState({
		email: '',
		password: '',
	});
	const [checked, setChecked] = useState(false);

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
		dispatch(logInUser(values));
	};

	useEffect(() => {
		if (logged === 'Unauthorized') {
			setChecked(true);
		} else if (logged === true) {
			setChecked(false);
			handleClose(true);
		}
	}, [logged, handleClose]);

	const handleChangeFormType = () => {
		dispatch(toggleFormType('signup'));
	};

	return (
		<>
			<div className={`${styles.body} ${showForm && styles.active}`}>
				<h3>
					Login <button onClick={handleClose}>X</button>
				</h3>
				<form onSubmit={(e) => handleSubmit(e)}>
					<label>
						<input
							type="email"
							name="email"
							placeholder="Your email"
							value={values.email}
							onChange={handleChange}
							required
						/>
						{!checked ? '' : <div>Wrong password or email</div>}
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
					<div onClick={handleChangeFormType}>I need create an account</div>
					<button className="button">login</button>
				</form>
			</div>
		</>
	);
}

export default UserloginForm;
