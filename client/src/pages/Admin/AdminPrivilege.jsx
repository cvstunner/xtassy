import axios from "axios";
import React, {useRef} from 'react';
import {useState, useEffect} from 'react';
import toast from "react-hot-toast";
import { Modal } from "antd";
import Layout from '../../components/Layout/Layout';
import PrivilegeForm from "../../components/Form/PrivilegeForm";
import Prompt from "../../components/Prompt/Prompt";
import AdminMenu from '../../components/Layout/AdminMenu';

const AdminPrivilege = () => {
	const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [privilege, setPrivilege] = useState("");
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [removePrompt, setRemovePrompt] = useState(false);
  const [selected, setSelected] = useState(null);
  const [eleId, setEleId] = useState(null);
  let table = useRef();
  let count = 0;

  const closePrompt = () => setPrompt(false);
  const closeRemovePrompt = () => setRemovePrompt(false);

  const getAllAdmins = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin`);
      if (res.data?.success) {
        setUsers(res.data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting Users!");
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
        getAllAdmins();
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
        `${process.env.REACT_APP_API}/api/v1/admin/${selected._id}`,
        { name: name, email: email, phone: phone, privilege: privilege }
      );
      if (res.data?.success) {
        toast.success(`${name} is updated!`);
        setSelected(null);
        setVisible(false);
        getAllAdmins();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async () => {
  	closeRemovePrompt();
    try {
      const res = await axios.patch(`${process.env.REACT_APP_API}/api/v1/admin/${selected._id}`, { privilege: 3 });
      if (res.data?.success) {
        toast.success(`${name} is Removed!`);
        setSelected(null);
        setVisible(false);
        getAllAdmins();
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
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/0/${eleId}`);
      if (res.data.success) {
        toast.success(`${name} is Deleted!`);
        getAllAdmins();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong!");
    }
  };

  useEffect(() => {
    getAllAdmins();
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
							<h3 className="fw-bold text-secondary mt-4 mb-4">Admin Privileges</h3>
							<div>
				      <form onSubmit={handleSubmit} className="d-flex">
				        <div className="w-25">
				          <input
				            type="text"
				            className="form-control"
				            placeholder="Enter name, email"
				            value={name}
				            onChange={(e) => setName(e.target.value)}
				          />
				        </div>

				        <button className="btn btn-secondary ms-2" onClick={(e) => handleSubmit(e)}>
				          Search
				        </button>
				      </form>
							</div>
              <table className="table table-hover" ref={table}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Privileges</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users?.map((ele) => (
                        <tr>
                          <td key={ele._id}>{count = count + 1}</td>
                          <td className="w-25 pt-2">{ele.name}</td>
                          <td className="w-25 pt-2">{ele.email}</td>
                          <td className=" pt-2">{ele.phone}</td>
                          <td className=" pt-2">
                          {
                            ele.privilege === 0 ? "High" : (<></>)
                          }
                          {
                            ele.privilege === 1 ? "Medium" : (<></>)
                          }
                          {
                            ele.privilege === 2 ? "Low" : (<></>)
                          }
                          </td>
                          <td className="pt-2">
                            <span className="badge bg-primary rounded-pill ps-3 pe-3 pt-2 pb-2" onClick={() => { 
                                setVisible(true);
                                setName(ele.name);
                                setEmail(ele.email);
                                setPhone(ele.phone);
                                setPrivilege(ele.privilege);
                                setSelected(ele); 
                              }} >
                              Edit
                            </span>
                            <span className="badge bg-secondary ms-2 rounded-pill ps-3 pe-3 pt-2 pb-2" onClick={() => {
                                setRemovePrompt(true);
                                setSelected(ele); 
                                setName(ele.name);
                              }} > 
                              Remove 
                            </span>
                            <span className="badge bg-danger ms-2 rounded-pill ps-3 pe-3 pt-2 pb-2" onClick={() => {
                                setPrompt(true);
                                setEleId(ele._id);
                                setName(ele.name);
                              }} > 
                              Delete 
                            </span>
                          </td>
                        </tr>
                      )
                    )
                  }
                </tbody>
              </table>
						</div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
            <div className="mt-4">
            	<p className="fw-bold fs-6 mb-1">Confirm Changes?</p>
              <PrivilegeForm
                name={name}
                email={email}
                phone={phone}
                privilege={privilege}
                setName={setName}
                setEmail={setEmail}
                setPhone={setPhone}
                setPrivilege={setPrivilege}
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
            <Modal
              onCancel={() => setPrompt(false)}
              footer={null}
              open={removePrompt}
            >
              <div className="mt-4">
                <Prompt
                  msg="Confirm Remove?"
                  btn="delete"
                  btnMsg="remove"
                  closePrompt = {closeRemovePrompt}
                  handler = {handleRemove}
                />
              </div>
            </Modal>

					</div>
				</div>
			</div>
		</Layout>
	)
}

export default AdminPrivilege;