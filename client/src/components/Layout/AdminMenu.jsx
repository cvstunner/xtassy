import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {useAuth} from '../../context/auth';

const AdminMenu = () => {
	const [auth, setAuth] = useAuth();

	return (
		<>
			<div>
				<div className="list-group user-menu">
				  <NavLink to="/admin/profile" className="list-group-item list-group-item-action" aria-current="true">
				    <div className="ms-2 me-auto mt-2">
				      <div className="fw-bold">Profile</div>
				      <p className="mb-2">name, email and mobile number</p>
				    </div>
				  </NavLink>
				  {
				  	(auth?.user?.privilege === 0 || auth?.user?.privilege === 1 || auth?.user?.privilege === 2) ? (
				  		<>		  			
							  <NavLink to="/admin/users" className="list-group-item list-group-item-action">
							    <div className="ms-2 me-auto mt-2">
							      <div className="fw-bold">Users</div>
							      <p className="mb-2">Manage your users</p>
							    </div>
							  </NavLink>
				  		</>
				  	) : 
				  	(<></>)
				  }
				  {
				  	auth?.user?.privilege === 0 ? (
				  		<>			  			
							  <NavLink to="/admin/privileges" className="list-group-item list-group-item-action">
							    <div className="ms-2 me-auto mt-2">
							      <div className="fw-bold">Privileges</div>
							      <p className="mb-2">Manage your Admins scopes</p>
							    </div>
							  </NavLink>
				  		</>
				  	) : 
				  	(<></>)
				  }
				  <NavLink to="/admin/banner" className="list-group-item list-group-item-action">
				    <div className="ms-2 me-auto mt-2">
				      <div className="fw-bold">Banners</div>
				      <p className="mb-2">Mange Banner thumbnails</p>
				    </div>
				  </NavLink>
				  <NavLink to="/admin/category" className="list-group-item list-group-item-action">
				    <div className="ms-2 me-auto mt-2">
				      <div className="fw-bold">Categories</div>
				      <p className="mb-2">Create, Edit & Delete categories</p>
				    </div>
				  </NavLink>
				  <NavLink to="/admin/product" className="list-group-item list-group-item-action">
				    <div className="ms-2 me-auto mt-2">
				      <div className="fw-bold">Products</div>
				      <p className="mb-2">Create, Edit & Delete products</p>
				    </div>
				  </NavLink>
				</div>
			</div>
		</>
	)
}

export default AdminMenu;