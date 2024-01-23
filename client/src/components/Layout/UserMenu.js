import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const UserMenu = () => {
	return (
		<>
			<div>
				<div class="list-group user-menu">
				  <NavLink to="/user/profile" className="list-group-item list-group-item-action" aria-current="true">
				    <div class="ms-2 me-auto mt-2">
				      <div class="fw-bold">Profile</div>
				      <p className="mb-2">name, email and mobile number</p>
				    </div>
				  </NavLink>
				  <NavLink to="/user/addresses" className="list-group-item list-group-item-action">
				    <div class="ms-2 me-auto mt-2">
				      <div class="fw-bold">Addresses</div>
				      <p className="mb-2">Edit your Addresses</p>
				    </div>
				  </NavLink>
				  <NavLink to="/user/orders" className="list-group-item list-group-item-action">
				    <div class="ms-2 me-auto mt-2">
				      <div class="fw-bold">Orders</div>
				      <p className="mb-2">Track & Return Orders</p>
				    </div>
				  </NavLink>
				  <NavLink to="/user/security" className="list-group-item list-group-item-action">
				    <div class="ms-2 me-auto mt-2">
				      <div class="fw-bold">Security</div>
				      <p className="mb-2">Change password,<br/>Two factor authentication</p>
				    </div>
				  </NavLink>
				  <NavLink to="/Contact" className="list-group-item list-group-item-action ">
				    <div class="ms-2 me-auto mt-2">
				      <div class="fw-bold">Contact Us</div>
				      <p className="mb-2">24x7 available,<br/>for more queries</p>
				    </div>
					</NavLink>
				</div>
			</div>
		</>
	)
}

export default UserMenu;