import { Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import UpdateProductForm from "../components/Form/UpdateProductForm";
import Prompt from "../components/Prompt/Prompt";
import Layout from '../components/Layout/Layout';
const { Option } = Select;

const Product = () => {
  const [catgs, setCatgs] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dscpt, setDscpt] = useState("");
  const [MRP, setMRP] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [prompt, setPrompt] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const closePrompt = () => setPrompt(false);

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${params.slug}`);
      setId(res.data.singleProduct._id);
      setName(res.data.singleProduct.name);
      setDscpt(res.data.singleProduct.description);
      setMRP(res.data.singleProduct.MRP);
      setPrice(res.data.singleProduct.price);
      setCategory(res.data.singleProduct.category._id);
      console.log(category);
      setQuantity(res.data.singleProduct.quantity);
      setShipping(res.data.singleProduct.shipping);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", dscpt);
      productData.append("MRP", MRP);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const res = axios.put(`${process.env.REACT_APP_API}/api/v1/product/${id}`, productData);
      if (res.data?.success) {
        toast.error(res.data?.message);
      } else {
        navigate("/admin/products?updated=true");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/${id}`);
      navigate("/admin/products?deleted=true");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategories();
  }, []);

  return (
    <Layout title="Flashy | Dashboard">
      <div className="container-sm">
        <div className="row">
          <div className="col">
            <div>
              <h3 className="fw-bold text-secondary mt-4 mb-3 ps-1">Update Product</h3>
              <UpdateProductForm
                categories={catgs}
                setName={setName}
                setDscpt={setDscpt}
                setMRP={setMRP}
                setPrice={setPrice}
                setCategory={setCategory}
                setQuantity={setQuantity}
                setShipping={setShipping}
                setPhoto={setPhoto}
                id={id}
                name={name}
                dscpt={dscpt}
                MRP={MRP}
                price={price}
                category={category}
                quantity={quantity}
                shipping={shipping}
                photo={photo}
                handleUpdate={handleUpdate}
                setPrompt={setPrompt}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        onCancel={() => setPrompt(false)}
        footer={null}
        open={prompt}
      >
        <div className="mt-4">
          <Prompt
            msg="Confirm Delete?"
            btn="delete"
            closePrompt={closePrompt}
            handler={handleDelete}
          />
        </div>
      </Modal>
    </Layout>
  )
}

export default Product;
