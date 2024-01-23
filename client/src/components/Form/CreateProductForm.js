import React from "react";
import { useState, useEffect } from "react";
import {NavLink, Link} from 'react-router-dom';
import { Select } from "antd";
const { Option } = Select;

const CreateProductForm = ({ categories, setName, setDscpt, setPrice, setMRP, setCategory, setQuantity, setShipping, setPhoto, name, dscpt, price, MRP, category, quantity, shipping, photo, handleSubmit}) => {
  return (
    <>
      <form className="m-1 row" onSubmit={handleSubmit}>
        <div className="row ps-0 pe-0 d-flex justify-content-center">
          <div className="col">                 
            <div className="mb-3 create-product-wrpr">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    style={{borderRadius:"5px"}}
                    className="img img-responsive"
                  />
                </div>
                )
                :
                <div className="create-product-plchldr-wrpr bg-secondary-subtle">
                  <h5 className="text-secondary text-center ps-4 pe-4 text-dark">Product Image</h5>
                </div>
              }
            </div>   
            <div className="mb-3 ps-0 pe-0">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
          </div>
          <div className="col">   
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="product name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="small"
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select> 
            <div className="mb-3">
              <textarea
                type="text"
                value={dscpt}
                placeholder="write a description"
                rows="7"
                style={{resize:"none"}}
                className="form-control pb-2"
                onChange={(e) => setDscpt(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row ps-0 pe-0">
          <div className="col">
            <div className="row">      
              <div className="col">
                <div className="mb-3">
                  <input
                    type="number"
                    value={MRP}
                    placeholder="MRP"
                    className="form-control"
                    onChange={(e) => setMRP(e.target.value)}
                  />
                </div>
              </div>
              <div className="col ps-0">
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                  <div className="mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="Quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
              </div>
              <div className="col ps-0">
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Shipping"
                    size="small"
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ps-0 pe-0">
          <div className="col">
            <div className="row">
              <div className="col">
                <button className="btn btn-primary container-fluid" type="submit">
                  CREATE PRODUCT
                </button>
              </div>
              <div className="col ps-0">
                <Link to="/admin/products" className="btn btn-secondary container-fluid" type="submit">
                MANAGE PRODUCTS
                </Link> 
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </form>
    </>
  );
}

export default CreateProductForm;