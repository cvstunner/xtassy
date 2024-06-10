import React from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from "react-toastify";
import {Toaster} from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';

const Layout = ({children, title, description, keywords, author}) => {
	return (
		<div>
	        <Helmet>
	            <title>{title}</title>
	            <meta charSet="utf-8" />
	            <meta name="description" content={description} />
	            <meta name="keywords" content={keywords} />
	            <meta name="author" content={author} />
	        </Helmet>
			<Header/>
			<main>
				<ToastContainer
					position="top-center"
					autoClose={1000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					theme="light"
				/>
				<Toaster />
				{children}
			</main>
			<Footer/>
		</div>
	)
};

Layout.defaultProps = {
	title: "Xtassy",
	description: "Trendy Fashionable Cloths Shopping Website",
	keywords: "cloths, trendy, shopping, flashy, fashionable",
	author: "@cvstunner"
}

export default Layout;
