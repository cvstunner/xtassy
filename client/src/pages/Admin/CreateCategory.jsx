import { Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion } from 'react-bootstrap';
import toast from "react-hot-toast";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

import CategoryForm from "../../components/Form/CategoryForm";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import Prompt from "../../components/Prompt/Prompt";

// GLBL:
const { Option } = Select;

const CreateCategory = () => {
  // INIT:
  const [catgs, setCatgs] = useState({});
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [sub_title, setSubTitle] = useState("");
  const [eleId, setEleId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // HNDL:
  const groupCatgs = (data) => {
    const groupedCatgs = {};

    data.forEach(item => {
      if (!groupedCatgs[item.name])
        groupedCatgs[item.name] = {};

      if (!groupedCatgs[item.name][item.title])
        groupedCatgs[item.name][item.title] = [[-1, -1]];

      groupedCatgs[item.name][item.title].push([item._id, item.sub_title]);
    });

    return groupedCatgs;
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category`);

      if (res.data?.success)
        setCatgs(groupCatgs(res.data.categories));

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

  const closePrompt = () => setPrompt(false);

  useEffect(() => {
    getAllCategories();
  }, []);

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

              <Accordion className="mt-2" defaultActiveKey="0">
                {Object.keys(catgs).map((nameKey, nameIndex) => (
                  <Accordion.Item eventKey={nameIndex.toString()} key={nameKey}>
                    <Accordion.Header>{nameKey}</Accordion.Header>
                    <Accordion.Body>
                      <Accordion>
                        {Object.keys(catgs[nameKey]).map((titleKey, titleIndex) => (
                          <Accordion.Item eventKey={titleIndex.toString()} key={titleKey}>
                            <Accordion.Header>{titleKey}</Accordion.Header>
                            <Accordion.Body>
                              <div>
                                {catgs[nameKey][titleKey].map((ele, subIndex) => ele[0] != -1 && ele[1] != -1 ? (

                                  <div key={subIndex} className="d-flex border border-secondary-subtle rounded mb-2">
                                    <div className="w-100 p-2 ps-3 text-dark">{ele[1]}</div>
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
                                ) : (<></>))}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        ))}
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>

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
    </Layout >
  );
};

export default CreateCategory;
