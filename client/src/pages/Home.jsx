import axios from "axios";
import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import { Link } from "react-router-dom";
import { useAuth } from '../context/auth';
import toast from "react-hot-toast";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [banners, setBanner] = useState([]);
  const [products, setProducts] = useState([]);

  const getAllBanners = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/banner`);
      setBanner(res.data.banners);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

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
    getAllBanners();
    getAllProducts();
  }, []);

  return (
    <Layout title="Xtassy">
      <div className="container-fluid w-100">
        <div className="row h-25">
          <div id="banner-carousel" className="carousel carousel-dark p-0 slide" data-bs-ride="carousel" data-bs-pause="false">
            <div className="carousel-inner text-center">
              {
                banners?.map((ele, index) => (
                  <div
                    className={
                      `carousel-item text-center banner-carousel-img-wrpr` + (index === 0 ? ' active' : '')
                    }
                    data-bs-interval="4000">
                    <img src={URL.createObjectURL(new Blob([Int8Array.from(ele.photo.data.data)], { type: ele.photo.contentType }))}
                      className="d-block position-absolute top-50 start-50 translate-middle"
                      alt="banner_img"
                      height={"400px"} />
                  </div>
                ))
              }
            </div>
            <button className="carousel-control-prev banner-carousel-btn" type="button" data-bs-target="#banner-carousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next banner-carousel-btn" type="button" data-bs-target="#banner-carousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
            <div className="carousel-indicators banner-carousel-indicators">
              <button type="button" data-bs-target="#banner-carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#banner-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#banner-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#banner-carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
              <button type="button" data-bs-target="#banner-carousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>
          </div>
        </div>
        <div className="row ms-5 me-5 ps-5 pe-5">
          <div className="row">
            <div className="col ps-4 pe-4">
              <h3 className="fw-bold text-dark mt-1 mb-3">Oversized T-Shirts for Men</h3>
            </div>
          </div>
          <div className="row m-0 p-0 pt-4">
            <div className="col-md-2">
              <div className="col ms-4">
                <h6 className="fw-bold text-muted mb-3">Filters</h6>
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item border-start-0 border-end-0 border-top-0 border-bottom-1">
                    <h2 class="accordion-header">
                      <button class="accordion-button ps-0 pe-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Categories
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item border-start-0 border-end-0 border-top-0 border-bottom-1">
                    <h2 class="accordion-header">
                      <button class="accordion-button ps-0 pe-0 border-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Brand
                      </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item border-start-0 border-end-0 border-top-0 border-bottom-1">
                    <h2 class="accordion-header">
                      <button class="accordion-button ps-0 pe-0 border-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Fabric
                      </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item border-start-0 border-end-0 border-top-0 border-bottom-1">
                    <h2 class="accordion-header">
                      <button class="accordion-button ps-0 pe-0 border-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        Size
                      </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-10 ps-2 pe-2">
              <div className="row row-cols-6 m-0">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={auth?.user?.privilege === 0 || auth?.user?.privilege === 1 || auth?.user?.privilege === 2 ? `/admin/product/${p.slug}` : `/product/${p.slug}`}
                    className="col product-link mb-3 d-flex justify-content-center overflow-hidden"
                    style={{ height: "100%", overflow: "hidden" }}
                  >
                    <div className="card" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                      <div className="text-center d-flex justify-content-center align-items-end p-2 pt-3 pb-0" style={{ minHeight: "200px" }}>
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/photo/${p._id}`}
                          height={"100%"}
                          alt={p.name}
                          className="img img-responsive"
                        />
                      </div>
                      <div className="card-body ps-2 pe-2 pt-2">
                        <h6 className="card-title text-center product-link-title">{p.name}</h6>
                        <div className="container-md flex-column d-flex justify-content-end align-items-center ps-1 pe-1 text-center product-other-det-wrpr">
                          <span className="d-flex align-items-end product-other-det">
                            <h4 className="card-text fw-semibold mb-0 text-dark product-link-price"><sup className="fw-normal fs-6">₹</sup>{p.price}</h4>
                            <h6 className="card-text mb-0 ms-1 text-secondary">M.R.P:</h6>
                            <h6 className="card-text text-decoration-line-through mb-0 ms-1 text-secondary text-center">₹{p.MRP}</h6>
                          </span>
                          <span className="card-text text-center text-wrap mb-0">
                            <h6 className="mb-0 ms-1">({Math.round(((p.MRP - p.price) / p.price) * 100)}% off)</h6>
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
      </div>
      <pre>
        {
          JSON.stringify(auth, null, 4)
        }
      </pre>
    </Layout>
  )
}

export default Home;
