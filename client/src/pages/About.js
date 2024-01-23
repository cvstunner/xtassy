import React from 'react';
import Layout from './../components/Layout/Layout';

const About = () => {
	return (
		<Layout title="Flashy | About">
			<div>
				<div className="contactus-cont container-fluid row mt-4 me-0 pe-0">
					<div className="col d-flex flex-column p-0 ps-5 mt-5 align-items-center">
						<h1 className="fw-bold mt-4 text-dark pe-2">About</h1>
						<div className="fs-5 mt-5 ps-4 pe-2">	
							<p className="mb-4 text-justify">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed impedit, exercitate com laboriosam, officiis repellat. Recusandae ducimus, nem nisi repellat iusto  voluptatem omnis ilique, asperiores illum mollitia quaerat autem.
							</p>	
							<p className="mb-4 text-justify">
							dolores tenetur porro explicabo nobis mollitia, minus veritatis expedita natus, numqimilique, asperiores illum mollitia quaerat autem.culpa maiores esse iste veniam corporis s
							</p>
						</div>
					</div>
					<div className="col p-0 d-flex justify-content-center">
						<div className="about-img"></div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default About;