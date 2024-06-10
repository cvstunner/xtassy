import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
	return (
		<div className="footer bg-dark text-light p-4">
			<h4 className="text-center">All Rights Reserved © Flashy</h4>
			<p className="text-center m-0 footer-links-cont">
				<Link to="/about" className="text-light ms-2 me-2 link-offset-2">About</Link>
				|
				<Link to="/contact" className="text-light ms-2 me-2 link-offset-2">Contact</Link>
				|
				<Link to="/policy" className="text-light ms-2 me-2 link-offset-2">Privacy Policy</Link>
			</p>
		</div>
	)
}

export default Footer;
