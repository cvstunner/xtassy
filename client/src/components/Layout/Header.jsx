import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import SignIn from './../../pages/Auth/SignIn';
import { useAuth } from '../../context/auth';
import useCategory from '../../hooks/useCategory';
import { Modal } from "antd";
import Prompt from "../../components/Prompt/Prompt";

const Header = () => {
  const navigate = useNavigate();
  const [seen, setSeen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [prompt, setPrompt] = useState(false);
  const categories = useCategory();
  const [catgs, setCatgs] = useState({});

  function togglePop() {
    setSeen(!seen);
  }

  const groupCatgs = (data) => {
    const groupedCatgs = {};

    data?.forEach(item => {
      if (!groupedCatgs[item.name])
        groupedCatgs[item.name] = {};

      if (!groupedCatgs[item.name][item.title])
        groupedCatgs[item.name][item.title] = [[-1, -1]];

      groupedCatgs[item.name][item.title].push([item._id, item.sub_title]);
    });

    return groupedCatgs;
  };

  const populateCatgs = (nameKey) => {
    if (!catgs || !catgs[nameKey])
      return null;

    return (<div className="w-100 h-100 d-flex flex-column flex-wrap">
      {Object.keys(catgs[nameKey]).map((titleKey, titleIndex) => (
        <div className="catgs-ele-wrpr w-50 mt-4" key={titleKey}>
          <h5 className='mb-0 fw-bold' style={{ fontSize: "1.15em" }}>{titleKey}</h5>
          <div className="d-flex flex-column">
            {catgs[nameKey][titleKey].map((ele, subIndex) => ele[0] != -1 && ele[1] != -1 ? (
              <div>
                <p className="mb-0">{ele[1]}</p>
              </div>
            ) : (<></>))}
          </div>
        </div>
      ))}

    </div>)
  }

  useEffect(() => {
    setCatgs(groupCatgs(categories));
  }, [categories]);

  const closePrompt = () => setPrompt(false);

  const handleLogout = () => {
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
                  <div className="p-5 pb-2 position-absolute top-0 start-0 d-none"></div>
                  <ul className="dropdown-menu nav-catg-dropdown-menu rounded-top-0 align-items-center mt-0 pt-3 pb-3 ps-5 pe-5">
                    {populateCatgs("Ladies")}
                  </ul>
                </Link>
              </li>
              <li className="nav-item d-flex align-items-end">
                <Link className="nav-link dropdown nav-catg-dropdown ps-3 pe-3 tex-dark" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                  MENS

                  <div className="p-5 pb-2 position-absolute top-0 start-0 d-none"></div>
                  <ul className="dropdown-menu nav-catg-dropdown-menu rounded-top-0 align-items-center mt-0 pt-3 pb-3 ps-5 pe-5">
                    {populateCatgs("Mens")}
                  </ul>
                </Link>
              </li>
              <li className="nav-item d-flex align-items-end">
                <Link className="nav-link dropdown nav-catg-dropdown ps-3 pe-3 tex-dark" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                  KIDS
                  <ul className="dropdown-menu nav-catg-dropdown-menu rounded-top-0 align-items-center mt-0 pt-3 pb-3 ps-5 pe-5">
                    {populateCatgs("Kids")}
                  </ul>
                </Link>
              </li>
              <li className="nav-item d-flex align-items-end">
                <Link className="nav-link dropdown nav-catg-dropdown ps-3 pe-3 tex-dark" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                  SASSY
                  <ul className="dropdown-menu nav-catg-dropdown-menu rounded-top-0 align-items-center mt-0 pt-3 pb-3 ps-5 pe-5">
                    {populateCatgs("Sassy")}
                  </ul>
                </Link>
              </li>
            </ul>
            <ul className="d-flex align-items-center p-0 m-0" type="none">
              <li className="nav-item ms-2 me-3 w-50">
                <form className="search-bar d-flex" role="search">
                  <BiSearch />
                  <input className="search-bar-input form-control border-secondary-subtle rounded-2 pt-2 pb-2" type="search" placeholder="Search Products" aria-label="Search" />
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
                              `${(auth?.user?.privilege === 0 || auth?.user?.privilege === 1 || auth?.user?.privilege === 2) ? "/admin/profile" : "/user/profile"
                              }`
                            } className="dropdown-item ps-0 pe-0 text-center nav-user-items">Dashboard</Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider mt-1 mb-1" /></li>
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
                  btnMsg="Log Out"
                  closePrompt={closePrompt}
                  handler={handleLogout}
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
