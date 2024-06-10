import React, { useEffect } from 'react';
import {useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {BiSearch} from 'react-icons/bi';
import SignIn from './../../pages/Auth/SignIn';
import {useAuth} from '../../context/auth';
import useCategory from '../../hooks/useCategory';
import { Modal } from "antd";
import Prompt from "../../components/Prompt/Prompt";

const Header = () => {
  const navigate = useNavigate();
  const [seen, setSeen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [prompt, setPrompt] = useState(false);
  const categories = useCategory(); 
  const [catgs, setCatgs] = useState({
    "Ladies": {},
    "Mens": {},
    "Kids": {},
    "Sassy": {},
  });

  function togglePop(){
    setSeen(!seen);
  }

  useEffect(() => {
    // console.log(categories);
    categories.forEach((ele) => {
      let _id = ele._id;
      let name = ele.name;
      let title = ele.title;
      let sub_title = ele.sub_title;
      // console.log(catgs?.[ele.name])
      if (catgs?.[ele.name]?.[ele.title] !== undefined) {
        catgs?.[name]?.[title]?.push([_id, sub_title]);
        setCatgs(
          {
            ...catgs,
          },
        );
      } else {
        catgs[name][title] = [[_id, sub_title]];
        setCatgs(
          {
            ...catgs,
          },
        );
      }
    });
  }, [categories]);

  useEffect(() => {
    // console.log(catgs);
  }, [catgs]);

  const closePrompt = () => setPrompt(false);

  const handleLogout = () =>{
  	closePrompt();
    navigate("/");
  	setAuth({
  		...auth,
  		user: null,
  		token: ''
  	});
  	localStorage.removeItem("auth");
  	togglePop();
    navigate("/");
  }

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-white fixed-top ps-5 pe-5 pt-1 pb-1">
			  <div className="container-fluid ps-5 pe-5 pt-2 pb-2">
			    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
			      <span className="navbar-toggler-icon"></span>
			    </button>
			    <div className="collapse navbar-collapse justify-content-around" id="navbarTogglerDemo01">
			      <Link to="/" className="navbar-brand text-dark p-0 m-0 d-flex">
			      	{/* <p className="m-0 p-0">&tassy </p> */}
              <div className='brand-logo'></div>
			      </Link>
			      <ul className="navbar-nav mb-lg-0">
			        <li className="nav-item">
			          <Link to="/" className="nav-link ps-3 pe-3 tex-dark active" aria-current="page">HOME</Link>
			        </li>
			        <li className="nav-item d-flex align-items-end">
			          <Link className="nav-link dropdown nav-catg-dropdown ps-3 pe-3 tex-dark" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
			          	LADIES
									<ul className="dropdown-menu nav-catg-dropdown-menu rounded-top-0 align-items-center mt-0">
	                  <li className="nav-catg-items ps-3 pe-3">
	                    <Link className="dropdown-item d-flex flex-coloum justify-content-center" to={"/categories"}>
	                      All Categories
	                    </Link>
	                  </li>
                  	{
										categories?.map((ele) => (
	                    <li className="nav-catg-items ps-3 pe-3">
	                      <Link className="dropdown-item d-flex flex-coloum justify-content-center" to={`/category/${ele.slug}`}>
	                        {ele.name}
	                      </Link>
	                    </li>
	                  ))
										}
									</ul>
								</Link>
			        </li>
			        <li className="nav-item d-flex align-items-end">
			          <Link className="nav-link dropdown nav-catg-dropdown ps-3 pe-3 tex-dark" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
			          	MENS
			          	<div className="container pb-4 position-absolute start-0"></div>
									<ul className="dropdown-menu nav-catg-dropdown-menu rounded-top-0 align-items-start m-0 pt-4 pb-3 ps-3 pe-3 justify-content-around">
										<ul className="p-0" type="none">
		                  <li className="nav-catg-items">
		                    <Link className="dropdown-item" to={"/categories"}>
		                      All Categories
		                    </Link>
		                  </li>
	                  	{
		                    <li className="nav-catg-items">
		                      <Link className="dropdown-item" to={`/category/`}>
		                        {/* {ele.name} */}
		                      </Link>
		                    </li>
											}
										</ul>
									</ul>
								</Link>
			        </li>
			        <li className="nav-item d-flex align-items-end">
			          <Link className="nav-link dropdown nav-catg-dropdown ps-3 pe-3 tex-dark" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
			          	KIDS
									<ul className="dropdown-menu nav-catg-dropdown-menu rounded-top-0 align-items-center mt-0">
	                  <li className="nav-catg-items ps-3 pe-3">
	                    <Link className="dropdown-item d-flex flex-coloum justify-content-center" to={"/categories"}>
	                      All Categories
	                    </Link>
	                  </li>
                  	{
										categories?.map((ele) => (
	                    <li className="nav-catg-items ps-3 pe-3">
	                      <Link className="dropdown-item d-flex flex-coloum justify-content-center" to={`/category/${ele.slug}`}>
	                        {ele.name}
	                      </Link>
	                    </li>
	                  ))
										}
									</ul>
								</Link>
			        </li>
			        <li className="nav-item d-flex align-items-end">
			          <Link className="nav-link dropdown nav-catg-dropdown ps-3 pe-3 tex-dark" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
			          	SASSY
								</Link>
			        </li>
			      </ul>
			      <ul className="d-flex align-items-center p-0 m-0" type="none">
			        <li className="nav-item ms-2 me-3 w-50">
					  		<form className="search-bar d-flex" role="search">
						  		<BiSearch />
					        <input className="search-bar-input form-control border-secondary-subtle rounded-2 pt-2 pb-2" type="search" placeholder="Search Products" aria-label="Search"/>
					        {/* <button className="search-btn btn btn-secondary text-white rounded-2 ms-2" type="submit"> */}
					        {/* 	Search */}
					        {/* </button> */}
					      </form>
				      </li>
				      <div class="d-flex pt-2 pb-2">
							  <div class="vr"></div>
							</div>
			        <li className="nav-item d-flex ms-1 me-0" >
			        	{
			        		auth.user ? (
			          		<>
			          			<div className="nav-link p-0 dropdown ps-2 pe-2">
												<NavLink className="btn bg-transparent text-secondary dropdown-toggle border-0 p-0" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
												  {
												  	auth?.user?.privilege === 3 ? "User" : "Admin"
												  }
												</NavLink>
												<ul className="dropdown-menu nav-user-dropdown-menu">
												  <li>
												  	<Link to={
												  		`${
												  			(auth?.user?.privilege === 0 || auth?.user?.privilege === 1 || auth?.user?.privilege === 2) ? "/admin/profile" : "/user/profile"
												  		}`
												  	} className="dropdown-item ps-0 pe-0 text-center nav-user-items">Dashboard</Link>
												  </li>
										      <li>
											      <hr className="dropdown-divider mt-1 mb-1"/></li>
												  <li>
												  	<Link className="dropdown-item ps-0 pe-0 text-center dropdown-logout-link nav-user-items" onClick={() => { setPrompt(true); }}>Log out</Link>
												  </li>
												</ul>
											</div>
			          		</>
			        			) : (
			        			<>
			        				<NavLink className="nav-link ps-2 pe-2" onClick={togglePop}>Sign In</NavLink>
					            {seen ? <SignIn toggle={togglePop} /> : null}
					          </>
			        			)
			        	}
			        </li>
			        <li className="nav-item">
			          <NavLink to="/cart" className="nav-link ps-2 pe-2">Cart</NavLink>
			        </li>
			        <li className="nav-item">
			          <NavLink to="/cart" className="nav-link ps-2 pe-2">Wishlist</NavLink>
			        </li>
			      </ul>
            <Modal
              onCancel={() => setPrompt(false)}
              footer={null}
              open={prompt}
            >
            <div className="mt-4">
              <Prompt
                msg="Confirm Logout?"
                btn="delete"
                btnMsg = "Log Out"
                closePrompt = {closePrompt}
                handler = {handleLogout}
              />
            </div>
            </Modal>
			    </div>
			  </div>
			</nav>
		</>
	)
}

export default Header;
