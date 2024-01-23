import React from 'react';
import Layout from './../components/Layout/Layout';
import {MdEmail} from 'react-icons/md';
import {BsTelephoneOutboundFill} from 'react-icons/bs';
import {BiSupport} from 'react-icons/bi';

const Contact = () => {
	return (
		<Layout title="Flashy | Contact Us">
			<div>
				<div className="contactus-cont container-fluid row mt-4 me-0 pe-0">
					<div className="col p-0 pt-4 d-flex justify-content-center">
						<div className="contactus-img"></div>
					</div>
					<div className="col d-flex flex-column p-0 pe-5 mt-5 align-items-center">
						<h1 className="fw-bold mt-4 text-dark">Contact Us</h1>
						<div className="fs-5 mt-5">	
							<p className="mb-0 text-start">Any query or problem about our Product? feel free to Contact Us.</p>
							<p className="mb-0 text-start">We are 24x7 available, just for you!</p>
							<p className="mb-0"></p>
						</div>
						<div className="fs-5 mt-5 ms-5 ps-1 w-100">	
							<p className="mb-0 mt-2"><MdEmail/> : www.help@flashshopping.com</p>
							<p className="mb-0 mt-2"><BsTelephoneOutboundFill/> : 091-625-5664</p>
							<p className="mb-0 mt-2"><BiSupport/> : 1900-6555-0000 (toll free)</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Contact;