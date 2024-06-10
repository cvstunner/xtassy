import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import CreateProductForm from "../../components/Form/CreateProductForm";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
	const [catgs, setCatgs] = useState([]);
  const [name, setName] = useState("");
  const [dscpt, setDscpt] = useState("");
  const [MRP, setMRP] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category`);
      if (res.data?.success) {
        setCatgs(res.data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting Catgeories!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", dscpt);
      productData.append("MRP", MRP);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      console.log(photo);
      const { data } = axios.post(`${process.env.REACT_APP_API}/api/v1/product`, productData);
      if(data?.success){
        toast.error(data?.message);
      }else{
        navigate("/admin/products?created=true");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };


	return (
		<Layout title="Flashy | Dashboard">
			<div className="container-sm">
				<div className="row">
					<div className="col-3 pt-5">
						<AdminMenu/>
					</div>
					<div className="col pt-5">
						<div>
							<h3 className="fw-bold text-secondary mt-4 mb-4 ps-1">Create Product</h3>
							<CreateProductForm 
							categories={catgs}
							setName={setName}
							setDscpt={setDscpt}
							setMRP={setMRP}
							setPrice={setPrice}
							setCategory={setCategory}
							setQuantity={setQuantity}
							setShipping={setShipping}
							setPhoto={setPhoto}
							name={name}
							dscpt={dscpt}
							MRP={MRP}
							price={price}
							category={category}
							quantity={quantity}
							shipping={shipping}
							photo={photo}
							handleSubmit = {handleCreate}
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default CreateProduct;