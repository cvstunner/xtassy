import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import {MdAdd} from 'react-icons/md';

const UserAddresses = () => {
	return (
		<Layout title="Flashy | Dashboard">
			<div className="container-sm">
				<div className="row">
					<div className="col-3 pt-5">
						<UserMenu/>
					</div>
					<div className="col pt-5 user-dashboard-det-wrpr">
						<div>
							<h3 className="fw-bold text-secondary mt-4 mb-4 ms-2">Addresses</h3>
							<ul className="list-group list-group">
							  <li className="list-group-item d-flex justify-content-between align-items-start ps-4 pt-3 pb-3">
							    <div className="ms-2 me-auto">
							      <div className="fw-bold">Chetan Shigvan</div>
							      <p className="mb-0 w-75">
								      201/1st floor, new bawan chawl
											Vir Tanaji Malusre Marg, Ferbunder, Kalachowki, cotton green <br/>
								      Mumbai, Maharashtra 400033 <br/>
									  	India <br/>
									  	8928981257
								  	</p>
							    </div>
							    <span className="badge bg-secondary rounded-pill mt-2 ps-3 pe-3 pt-2 pb-2 ms-1 me-1">Edit</span>
							    <span className="badge bg-danger rounded-pill mt-2 ps-3 pe-3 pt-2 pb-2 ms-1 me-1">Delete</span>
							  </li>
							  <li className="list-group-item d-flex justify-content-between align-items-start ps-4 pt-3 pb-3">
							    <div className="ms-2 me-auto">
							      <div className="fw-bold">Ani Shish</div>
							      <p className="mb-0 w-75">
								      201/1st floor, new bawan chawl
											Vir Tanaji Malusre Marg, Ferbunder, Kalachowki, cotton green <br/>
								      Mumbai, Maharashtra 400033 <br/>
									  	India <br/>
									  	7021856518
								  	</p>
							    </div>
							    <span className="badge bg-success rounded-pill mt-2 ps-3 pe-3 pt-2 pb-2 ms-1 me-1">Set as Default</span>
							    <span className="badge bg-secondary rounded-pill mt-2 ps-3 pe-3 pt-2 pb-2 ms-1 me-1">Edit</span>
							    <span className="badge bg-danger rounded-pill mt-2 ps-3 pe-3 pt-2 pb-2 ms-1 me-1">Delete</span>
							  </li>
							  <li className="list-group-item d-flex justify-content-center align-items-start ps-4 pt-3 pb-3">
							    	<span className="btn border-2 border-secondary rounded-pill mt-2 ps-3 pe-3 pt-2 pb-2 text-dark">
							    	<MdAdd size="25"/> Add address</span>
							  </li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default UserAddresses;
