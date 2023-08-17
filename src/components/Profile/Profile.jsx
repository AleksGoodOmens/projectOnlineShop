import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from "./profile.module.scss"
import { updateUser } from '../../features/userSlice/userSlice'

function Profile() {
	const { currentUser } = useSelector(({ user }) => user)
	const dispatch = useDispatch()


	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		avatar:""
	})

	const handleChange = ({ target: { value, name } }) => {
		setValues({...values,[name]: value, })
	}

	useEffect(() => {
		if(!currentUser) return
		setValues(currentUser)
	},[currentUser])

	const handleSubmit = (e) => {
		e.preventDefault()

		const isEmpty = Object.values(values).some(val => !val)
		if (isEmpty) {
			// I can add something to show that form is empty
			return 
		}
		console.log(values)
		dispatch(updateUser(values))

	}

	
	return (
		<section className={styles.section}>
			{!currentUser ? <div>You need login</div> : 
				<>
					<h1>Welcome { currentUser.name}</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label>
							<input
								type="email"
								name="email"
								placeholder='Your email'
								value={values.email}
								onChange={handleChange}
								required />
						</label>
						<label>
							<input
								type="name"
								name="name"
								placeholder='Your name'
								value={values.name}
								onChange={handleChange}
								required />
						</label>
						<label>
							<input
								type="password"
								name="password"
								placeholder='Your password'
								value={values.password}
								onChange={handleChange}
								required />
						</label>
						<label>
							<input
								type="text"
								name="avatar"
								placeholder='Your avatar'
								value={values.avatar}
								onChange={handleChange}
								required />
						</label>
					</div>
						<div className={styles.img}><img src={values.avatar} alt={values.name} /></div>
					<button className='button'>Change</button>
				</form>
			</>
			}
		</section>
	)
}

export default Profile