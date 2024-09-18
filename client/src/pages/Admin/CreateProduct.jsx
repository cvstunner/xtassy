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
  const [shipping, setShipping] = useState("");
  const [sizes, setSizes] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0
  });
  const [photos, setPhotos] = useState({
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined
  });
  const photoIndices = []; // Array to hold the photo indices (keys)

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
      productData.append("sizes", JSON.stringify(sizes));
      productData.append("category", category);

      for (let key in photos) {
        if (photos[key]) {
          photoIndices.push(key); // Collect the photo index (key)
          productData.append("photos", photos[key]);
        }
      }

      productData.append('photoIndices', JSON.stringify(photoIndices)); // Append the array of indices

      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product`, productData);
      if (data?.success) {
        toast.success(data?.message);
      } else {
        navigate("/admin/products?created=false");
      }

    } catch (error) {
      console.error(error);
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message || 'Something went wrong!';

        if (status >= 400 && status < 500) {
          console.error(message);
          toast.error(message);
        } else if (status >= 500) {
          console.error(message);
          toast.error(message);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response received from the server. Please try again later.');
      } else {
        console.error('Error in setting up the request:', error.message);
        toast.error('Error in setting up the request.');
      }
    }
  };


  return (
    <Layout title="Flashy | Dashboard">
      <div className="container-sm">
        <div className="row">
          <div className="col-3 pt-5">
            <AdminMenu />
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
                setSizes={setSizes}
                setShipping={setShipping}
                setPhotos={setPhotos}
                name={name}
                dscpt={dscpt}
                MRP={MRP}
                price={price}
                category={category}
                sizes={sizes}
                shipping={shipping}
                photos={photos}
                handleSubmit={handleCreate}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct;
