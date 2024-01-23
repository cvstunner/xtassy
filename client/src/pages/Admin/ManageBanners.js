import axios from "axios";
import React from 'react';
import {useState, useEffect} from 'react';
import toast from "react-hot-toast";
import { Modal } from "antd";
import Layout from '../../components/Layout/Layout';
import CategoryForm from "../../components/Form/CategoryForm";
import Prompt from "../../components/Prompt/Prompt";
import AdminMenu from '../../components/Layout/AdminMenu';

const ManageBanners = () => {
	const [catgs, setCatgs] = useState([]);
  const [banners, setBanners] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [selected, setSelected] = useState(null);
  const [eleId, setEleId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const closePrompt = () => setPrompt(false);

  const getAllBanners = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/banner`);
      if (res.data?.success) {
        setBanners(res.data?.banners);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting Banners!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category`, {
        name,
      });
    	console.log(res.data.message);
      if(res.data?.success){
        toast.success(`${name} is created!`);
        getAllBanners();
      } else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/${selected._id}`,
        { name: updatedName }
      );
      if (res.data?.success) {
        toast.success(`${updatedName} is updated!`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllBanners();
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
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/${eleId}`);
      if (res.data.success) {
        toast.success(`category is deleted!`);

        getAllBanners();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong!");
    }
  };

  useEffect(() => {
    getAllBanners();
  }, []);

	return (
		<Layout title="Flashy | Dashboard">
			<div className="container-sm">
				<div className="row">
					<div className="col-3 pt-5">
						<AdminMenu/>
					</div>
					<div className="col pt-5">
						<div>
							<h3 className="fw-bold text-secondary mt-4 mb-3 ps-1">Manage Banners</h3>
							<div className="container d-flex flex-wrap justify-content-center align-items-center text-center">
              {banners?.map((ele, index) => (
                <div className="d-flex flex-column">
                  <img src={URL.createObjectURL(new Blob([Int8Array.from(ele.photo.data.data)], {type: ele.photo.contentType }))}
                      className="d-block manage-banner-img" 
                      alt={`banner_`+index+1}/>
                  <div className=""></div>
                  <div>
                    <h5>Banner {index+1}</h5>
                  </div>
                </div>
                ))
              }
             </div>
							</div>
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
                closePrompt = {closePrompt}
                handler = {handleDelete}
              />
            </div>
            </Modal>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ManageBanners;