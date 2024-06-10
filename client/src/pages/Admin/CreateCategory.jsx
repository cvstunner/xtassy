import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal, Select } from "antd";
import { MdEnergySavingsLeaf, MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import Layout from "../../components/Layout/Layout";
import CategoryForm from "../../components/Form/CategoryForm";
import Prompt from "../../components/Prompt/Prompt";
import AdminMenu from "../../components/Layout/AdminMenu";
const { Option } = Select;

const CreateCategory = () => {
  const [html, setHTML] = useState("");
  const [ladiesCatgs, setLadiesCatgs] = useState({});
  const [mensCatgs, setMensCatgs] = useState({});
  const [kidssCatgs, setKidsCatgs] = useState({});
  const [sassyCatgs, setSassyCatgs] = useState({});
  // const [catgs, setCatgs] = useState({
  //   Ladies: {},
  //   Mens: {},
  //   Kids: {},
  //   Sassy: {},
  // });
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [sub_title, setSubTitle] = useState("");
  const [eleId, setEleId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const closePrompt = () => setPrompt(false);

  const populateCatgs = () => {
    const catgs = [ladiesCatgs, mensCatgs, kidssCatgs, sassyCatgs];
    const catgsNames = ["Ladies", "Mens", "Kids", "Sassy"];
    let html = "";

    catgsNames.forEach((name) => {
      return (
        <div class="accordion mt-2" id={"accordion" + name}>
          <div className="accordion-item">
            <h2 className="accordion-header d-flex">
              <button
                className="accordion-button bg-light shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + name}
                aria-expanded="true"
                aria-controls={"collapse" + name}
              >
                <div className="w-100 text-dark">{name}</div>
              </button>
            </h2>
            <div
              id={"collapse" + name}
              className="accordion-collapse collapse"
              data-bs-parent={"#accordion-" + name}
            >
              <div className="accordion-body">
                {
                  // console.log(catgs[0])
                  Object.keys(catgs).map((title, count) => (
                  <div
                    className="accordion mt-2"
                    id={"catg-accordion-" + title.replace(/ /g, "-") + count}
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header d-flex">
                        <button
                          className="accordion-button bg-light shadow-none"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={
                            "#catg-collapse-" + title.replace(/ /g, "-") + count
                          }
                          aria-expanded="true"
                          aria-controls={
                            "catg-collapse-" + title.replace(/ /g, "-") + count
                          }
                        >
                          <div className="w-100 text-dark">{title}</div>
                        </button>
                      </h2>
                      <div
                        id={"catg-collapse-" + title.replace(/ /g, "-") + count}
                        className="accordion-collapse collapse"
                        data-bs-parent={
                          "catg-accordion-" + title.replace(/ /g, "-") + count
                        }
                      >
                        <div className="accordion-body">
                          <div className="d-flex flex-column w-100 ">
                            {catgs[count]?.[title]?.map((ele) => (
                              // console.log("catgs: ", catgs);
                              <div
                                key={ele[0]}
                                className="d-flex border border-secondary-subtle rounded mb-2"
                              >
                                <div className="w-100 p-2 ps-3 text-dark">
                                  {ele[1]}
                                </div>
                                <div className="d-flex justify-content-end w-100">
                                  <button
                                    className="catg-title-control-btn bg-transparent border-0 float-end pe-4"
                                    onClick={() => {
                                      setVisible(true);
                                      setName(name);
                                      setEleId(ele[0]);
                                    }}
                                  >
                                    <MdModeEdit color="#30262d" />
                                  </button>
                                  <button
                                    className="catg-title-control-btn bg-transparent border-0 float-end pe-4"
                                    onClick={() => {
                                      setPrompt(true);
                                      setEleId(ele[0]);
                                    }}
                                  >
                                    <MdDeleteForever color="#30262d" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const addCatgs = async (catgs, setCatgs, _id, name, title, sub_title) => {
    if (catgs?.[title] !== undefined) {
      // catgs?.[name]?.[title]?.push([_id, sub_title]);
      // let temp = [...catgs[name][title]];
      // temp.push([_id, sub_title]);
      // let temp = catgs?.[name]?.[title];
      // console.log("temp: ", temp);

      // console.log("temp: ", ...catgs[name][title])
      setCatgs((prev) => {
        return {
          ...prev[name],
          [title]: [...prev[name][title], [_id, sub_title]],
        };
      });

      // setCatgs({
      //   ...catgs,
      // });
    } else {
      // catgs[name][title] = [[_id, sub_title]];
      // let tmp = Object.assign({}, catgs, {
      //   [name]: {
      //     [title]: [[_id, sub_title]]
      //   }
      // });
      // console.log(
      //   "tmp: ",
      //   name,
      //   ", ",
      //   title,
      //   ": ",
      //   catgs?.[name]?.[title] === undefined,
      // );
      setCatgs((prev) => {
        return {
          ...prev[name],
          [title]: [[_id, sub_title]],
        };
      });
      // console.log("temp: ", catgs);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category`,
      );
      if (res.data?.success) {
        // console.log("categories: ", res.data);
        // setCatgs({
        //   Ladies: {},
        //   Mens: {},
        //   Kids: {},
        //   Sassy: {},
        // });
        res.data.categories.forEach((ele) => {
          let _id = ele._id;
          let name = ele.name;
          let title = ele.title;
          let sub_title = ele.sub_title;
          // console.log(catgs?.[ele.name])
          switch (name) {
            case "Ladies":
              addCatgs(ladiesCatgs, setLadiesCatgs, _id, name, title, sub_title);
            case "Mens":
              addCatgs(mensCatgs, setMensCatgs, _id, name, title, sub_title);
            case "Kids":
              addCatgs(kidssCatgs, setKidsCatgs, _id, name, title, sub_title);
            case "Sassy":
              addCatgs(sassyCatgs, setSassyCatgs, _id, name, title, sub_title);
          }
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting Catgeories!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category`,
        {
          title,
          sub_title,
          name,
        },
      );
      console.log(res);
      if (res.data?.success) {
        if (res.status == 200) {
          toast.success(`${sub_title} is created!`);
          getAllCategories();
        } else if (201) {
          toast.error(res.data.message);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("updatedName: ", updatedName);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/${eleId}`,
        { sub_title: updatedName },
      );
      if (res.data?.success) {
        toast.success(`${updatedName} is updated!`);
        setEleId(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    closePrompt();
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/${eleId}`,
      );
      if (res.data.success) {
        toast.success(`category is deleted!`);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong!");
    }
  };

  useEffect(() => {
    // console.log("test: ", catgsNames[0])
    getAllCategories();
  }, []);

  // useEffect(() => {
  //   console.log("useEffect: ", ladiesCatgs);
  // }, [ladiesCatgs]);

  return (
    <Layout title="Flashy | Dashboard">
      <div className="container-sm">
        <div className="row">
          <div className="col-3 pt-5">
            <AdminMenu />
          </div>
          <div className="col pt-5">
            <div>
              <h3 className="fw-bold text-secondary mt-4 mb-3 ps-1">
                Manage Categories
              </h3>
              <div>
                <form onSubmit={handleSubmit} className="d-flex">
                  <div className="w-100 d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="sub-title"
                      value={sub_title}
                      onChange={(e) => setSubTitle(e.target.value)}
                    />
                    <Select
                      bordered={false}
                      placeholder="category"
                      size="large"
                      className="form-select"
                      onChange={(value) => {
                        setName(value);
                      }}
                    >
                      <Option value="Ladies">Ladies</Option>
                      <Option value="Mens">Mens</Option>
                      <Option value="Kids">Kids</Option>
                      <Option value="Sassy">Sassy</Option>
                    </Select>
                  </div>

                  <button
                    className="btn btn-secondary ms-2"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Add
                  </button>
                </form>
              </div>
              {populateCatgs()}
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                open={visible}
              >
                <div className="mt-4">
                  <p className="fw-bold fs-6 mb-1">Confirm Changes?</p>
                  <CategoryForm
                    value={updatedName}
                    setValue={setUpdatedName}
                    handleSubmit={handleUpdate}
                  />
                </div>
              </Modal>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
