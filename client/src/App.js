import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";

import PageNotFound from "./pages/PageNotFound";
import UserAuthStatus from './routes/private/UserAuthStatus';
import Privileges from './routes/private/Privileges';

import Profile from "./pages/User/Profile";
import UserAddresses from "./pages/User/UserAddresses";
import UserOrders from "./pages/User/UserOrders";
import UserSecurity from "./pages/User/UserSecurity";
import AdminProfile from "./pages/Admin/AdminProfile";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ManageProduct from "./pages/Admin/ManageProduct";
import ManageUsers from "./pages/Admin/ManageUsers";
import AdminPrivilege from "./pages/Admin/AdminPrivilege";
import ManageBanners from "./pages/Admin/ManageBanners";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserAuthStatus />} >
          <Route path="profile" element={<Profile />} />
          <Route path="addresses" element={<UserAddresses />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="security" element={<UserSecurity />} />
        </Route>
        <Route path="/admin" element={<Privileges privilege={2}/>} >
          <Route path="profile" element={<AdminProfile />} />
          <Route path="category" element={<CreateCategory />} />
          <Route path="product" element={<CreateProduct />} />
          <Route path="product/:slug" element={<UpdateProduct />} />
          <Route path="products" element={<ManageProduct />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="banner" element={<ManageBanners />} />
        </Route>
        <Route path="/admin" element={<Privileges privilege={0}/>} >
          <Route path="privileges" element={<AdminPrivilege />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
