import React from 'react';
import Layout from './../components/Layout/Layout';

const PageNotFound = () => {
	return (
		<Layout  title="Page Not Found!">
			<div className="page-not-found d-flex flex-column justify-content-center align-items-center">
				<div className="">
					<h1 className="text-center text-dark fs-1 fw-bold">404</h1>
					<h3 className="text-center text-dark">Oops!, Page Not Found.</h3>
				</div>
			</div>
		</Layout>
	)
}

export default PageNotFound;