import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../features/userSlice/userSlice';
import UserSingUpForm from './UserSingUpForm';
import UserloginForm from './UserloginForm';

function UserLoginOrSingUp() {
	const { showForm, formType } = useSelector(({ user }) => user);

	const handleClose = () => {
		dispatch(toggleForm(false));
	};

	const dispatch = useDispatch();

	return (
		<>
			<div
				className={`${showForm && 'overlay'}`}
				onClick={handleClose}
			/>
			{formType === 'signup' ? (
				<UserSingUpForm handleClose={handleClose} />
			) : (
				<UserloginForm handleClose={handleClose} />
			)}
		</>
	);
}

export default UserLoginOrSingUp;
