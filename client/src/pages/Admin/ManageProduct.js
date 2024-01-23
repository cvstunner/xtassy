import React from 'react';
import { useState, useEffect } from "react";
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, Link, useNavigate } from "react-router-dom";
import CreateProductForm from "../../components/Form/CreateProductForm";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(3);
  const navigate = useNavigate();

  function notify(){
		const query = new URLSearchParams(window.location.search);
  	if(query.get("created") === 'true'){
        toast.success("Product created Successfully!");  
  	}
  	else if(query.get("updated") === 'true'){
        toast.success("Product updated Successfully!"); 
  	}
  	else if(query.get("deleted") === 'true'){
        toast.success("Product Deleted Successfully!"); 
  	}  
		navigate(`/admin/products`, { replace: true });
  }

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  useEffect(() => {
		notify(); 
    getAllProducts();
  }, []);


	return (
		<Layout title="Flashy | Dashboard">
			<div className="container-fluid">
				<div className="row">
					<div className="col ms-4">
						<h4 className="fw-bold text-secondary mt-4 mb-1 ps-2">Manage Products</h4>
					</div>
				</div>
				<div className="row">
					<div className="col ps-4 pe-4">
	          <div className="container-fluid d-flex justify-content-start flex-wrap">
	            {products?.map((p) => (
	              <Link key={p._id} to={`/admin/product/${p.slug}`} className="product-link m-2 mb-3 text">
	                <div className="card" style={{ width: "14.2rem", height: "20rem", overflow: "hidden"}}>
		                <div className="text-center d-flex justify-content-center align-items-end" style={{minHeight: "200px"}}>
		                  <img
		                    src={`${process.env.REACT_APP_API}/api/v1/product/photo/${p._id}`}
		                    height={"175px"}
		                    alt={p.name}
		                    className="img img-responsive"
		                  />
		                </div>
	                  <div className="card-body ps-2 pe-2 pt-2">
	                    <h6 className="card-title text-center">{p.name}</h6>
	                    <div className="container-md flex-column d-flex justify-content-end align-items-center ps-1 pe-1 text-center product-other-det-wrpr">
		                    <span className="d-flex align-items-end product-other-det">	
			                    <h4 className="card-text fw-semibold mb-0 text-dark"><sup className="fw-normal fs-6">₹</sup>{p.price}</h4>
			                    <h6 className="card-text mb-0 ms-1 text-secondary">M.R.P:</h6>
			                    <h6 className="card-text text-decoration-line-through mb-0 ms-1 text-secondary text-center">₹{p.MRP}</h6>
		                    </span>
			                  <span className="card-text text-center text-wrap mb-0">
			                    <h6 className="mb-0 ms-1">({Math.round(((p.MRP - p.price)/p.price)*100)}% off)</h6>
			                  </span>
	                    </div>
	                  </div>
	                </div>
	              </Link>
	            ))}
	          </div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ManageProduct;
