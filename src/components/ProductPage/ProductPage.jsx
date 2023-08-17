import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';

import { ROUTES } from "../../utils/routes"

import SingleProduct from '../SingleProduct/SingleProduct'
import Products from '../Products/Products';
import { getRelatedProducts } from '../../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {related} = useSelector(({products}) => products)

	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery(({ id }));

	
	useEffect(() => {
		if (!isFetching && !isLoading && !isSuccess) {
			navigate(ROUTES.HOME)
	}
	}, [navigate,isLoading, isFetching, isSuccess])
	
	useEffect(() => {
		if (data) {
			dispatch(getRelatedProducts(data.category.id))
		}
	},[data, dispatch])

	return (
		<>
			{isSuccess ? <SingleProduct {...data} /> : <section>loading...</section>}
			<Products products={related} amount={5} title="related" />
			
		</>
	)
}

export default ProductPage