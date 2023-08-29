import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonSideBar = (props) => {
	return (
		<ContentLoader
			speed={2}
			width={240}
			height={160}
			viewBox="0 0 240 160"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
			{...props}
		>
			<rect
				x="18"
				y="24"
				rx="3"
				ry="3"
				width="124"
				height="2"
			/>
			<rect
				x="17"
				y="39"
				rx="3"
				ry="3"
				width="148"
				height="5"
			/>
			<rect
				x="14"
				y="4"
				rx="3"
				ry="3"
				width="153"
				height="5"
			/>
			<rect
				x="18"
				y="63"
				rx="3"
				ry="3"
				width="100"
				height="4"
			/>
			<rect
				x="17"
				y="86"
				rx="3"
				ry="3"
				width="153"
				height="5"
			/>
		</ContentLoader>
	);
};

export default SkeletonSideBar;
