import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Select } from "antd";
const { Option } = Select;

const CreateProductForm = ({ categories, setName, setDscpt, setPrice, setMRP, setCategory, setSizes, setShipping, setPhotos, name, dscpt, price, MRP, category, sizes, shipping, photos, handleSubmit }) => {
  return (
    <>
      <form className="m-1 row" onSubmit={handleSubmit}>
        <div className="row ps-0 pe-0 d-flex justify-content-center">
          <div className="col">
            <div id="create-product-carousel" className="carousel slide">
              <div className="carousel-inner mb-3 create-product-wrpr">
                <div className="carousel-item active h-100">
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    {photos[0] ?
                      (
                        <img
                          src={URL.createObjectURL(photos[0])}
                          alt="product_photos"
                          height={"200px"}
                          style={{ borderRadius: "5px" }}
                          className="img img-responsive"
                        />
                      )
                      :
                      (
                        <div className="create-product-plchldr-wrpr bg-secondary-subtle">
                          <h5 className="text-secondary text-center ps-4 pe-4 text-dark">Main photos</h5>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="carousel-item  h-100">
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    {photos[1] ?
                      (
                        <img
                          src={URL.createObjectURL(photos[1])}
                          alt="product_photos"
                          height={"200px"}
                          style={{ borderRadius: "5px" }}
                          className="img img-responsive"
                        />
                      )
                      :
                      (
                        <div className="create-product-plchldr-wrpr bg-secondary-subtle">
                          <h5 className="text-secondary text-center ps-4 pe-4 text-dark">Second photos</h5>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="carousel-item  h-100">
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    {photos[2] ?
                      (
                        <img
                          src={URL.createObjectURL(photos[2])}
                          alt="product_photos"
                          height={"200px"}
                          style={{ borderRadius: "5px" }}
                          className="img img-responsive"
                        />
                      )
                      :
                      (
                        <div className="create-product-plchldr-wrpr bg-secondary-subtle">
                          <h5 className="text-secondary text-center ps-4 pe-4 text-dark">Third photos</h5>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="carousel-item  h-100">
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    {photos[3] ?
                      (
                        <img
                          src={URL.createObjectURL(photos[3])}
                          alt="product_photos"
                          height={"200px"}
                          style={{ borderRadius: "5px" }}
                          className="img img-responsive"
                        />
                      )
                      :
                      (
                        <div className="create-product-plchldr-wrpr bg-secondary-subtle">
                          <h5 className="text-secondary text-center ps-4 pe-4 text-dark">Fourth photos</h5>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="carousel-item  h-100">
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    {photos[4] ?
                      (
                        <img
                          src={URL.createObjectURL(photos[4])}
                          alt="product_photos"
                          height={"200px"}
                          style={{ borderRadius: "5px" }}
                          className="img img-responsive"
                        />
                      )
                      :
                      (
                        <div className="create-product-plchldr-wrpr bg-secondary-subtle">
                          <h5 className="text-secondary text-center ps-4 pe-4 text-dark">Fifth photos</h5>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="carousel-item  h-100">
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    {photos[5] ?
                      (
                        <img
                          src={URL.createObjectURL(photos[5])}
                          alt="product_photos"
                          height={"200px"}
                          style={{ borderRadius: "5px" }}
                          className="img img-responsive"
                        />
                      )
                      :
                      (
                        <div className="create-product-plchldr-wrpr bg-secondary-subtle">
                          <h5 className="text-secondary text-center ps-4 pe-4 text-dark">Sixth photos</h5>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#create-product-carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#create-product-carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <div className="row mb-3 ps-0 pe-0">
              <div className="col">
                <label className="btn btn-outline-secondary col-md-12">
                  {photos[0] ? (<div className="text-primary">✔</div>) : "+"}
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    onChange={(e) =>
                      setPhotos(
                        (prev) => ({ ...prev, 0: e.target.files[0] })
                      )
                    }
                    hidden
                  />
                </label>
              </div>
              <div className="col">
                <label className="btn btn-outline-secondary col-md-12">
                  {photos[1] ? (<div className="text-primary">✔</div>) : "+"}
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    onChange={(e) =>
                      setPhotos(
                        (prev) => ({ ...prev, 1: e.target.files[0] })
                      )}
                    hidden
                  />
                </label>
              </div>
              <div className="col">
                <label className="btn btn-outline-secondary col-md-12">
                  {photos[2] ? (<div className="text-primary">✔</div>) : "+"}
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    onChange={(e) =>
                      setPhotos(
                        (prev) => ({ ...prev, 2: e.target.files[0] })
                      )}
                    hidden
                  />
                </label>
              </div>
              <div className="col">
                <label className="btn btn-outline-secondary col-md-12">
                  {photos[3] ? (<div className="text-primary">✔</div>) : "+"}
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    onChange={(e) =>
                      setPhotos(
                        (prev) => ({ ...prev, 3: e.target.files[0] })
                      )}
                    hidden
                  />
                </label>
              </div>
              <div className="col">
                <label className="btn btn-outline-secondary col-md-12">
                  {photos[4] ? (<div className="text-primary">✔</div>) : "+"}
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    onChange={(e) =>
                      setPhotos(
                        (prev) => ({ ...prev, 4: e.target.files[0] })
                      )}
                    hidden
                  />
                </label>
              </div>
              <div className="col">
                <label className="btn btn-outline-secondary col-md-12">
                  {photos[5] ? (<div className="text-primary">✔</div>) : "+"}
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    onChange={(e) =>
                      setPhotos(
                        (prev) => ({ ...prev, 5: e.target.files[0] })
                      )}
                    hidden
                  />
                </label>
              </div>

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
              className="form-control mb-3"
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
                style={{ resize: "none" }}
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
              <div className="col pe-1">
                <div className="mb-3">
                  <input
                    type="number"
                    value={sizes[0]}
                    placeholder="S"
                    className="form-control"
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        S: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
              <div className="col ps-1">
                <div className="mb-3">
                  <input
                    type="number"
                    value={sizes[1]}
                    placeholder="M"
                    className="form-control"
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        M: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <input
                    type="number"
                    value={sizes[2]}
                    placeholder="L"
                    className="form-control"
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        L: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <input
                    type="number"
                    value={sizes[3]}
                    placeholder="XL"
                    className="form-control"
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        XL: e.target.value
                      }))
                    }
                  />
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
          <div className="col">
            <div className="row h-100">
              <div className="col">
                <div className="h-100">
                  <Select
                    bordered={false}
                    placeholder="Shipping"
                    size="small"
                    className="form-select h-100"
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
      </form>
    </>
  );
}

export default CreateProductForm;
