import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';

const UserOrders = () => {
	return (
		<Layout title="Flashy | Dashboard">
			<div className="container-sm">
				<div className="row">
					<div className="col-3 pt-5">
						<UserMenu/>
					</div>
					<div className="col pt-5">
						<div>
							<h3 className="fw-bold text-secondary mt-4 mb-4">Orders</h3>
							<ul class="list-group list-group-numbered">
							  <li class="list-group-item d-flex justify-content-between align-items-start ps-4 pt-3 pb-3">
							    <div class="ms-2 me-auto">
							      <div class="fw-bold">Name</div>
							      Chetan Shigwan
							    </div>
							    <span class="badge bg-secondary rounded-pill mt-2 ps-4 pe-4 pt-2 pb-2">Edit</span>
							  </li>
							  <li class="list-group-item d-flex justify-content-between align-items-start ps-4 pt-3 pb-3">
							    <div class="ms-2 me-auto">
							      <div class="fw-bold">Email</div>
							      chetanshigwan789@gmail.com
							    </div>
							    <span class="badge bg-secondary rounded-pill mt-2 ps-4 pe-4 pt-2 pb-2">Edit</span>
							  </li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default UserOrders;