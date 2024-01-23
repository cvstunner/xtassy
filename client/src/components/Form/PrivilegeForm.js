import React from "react";
import { Select } from "antd";
const { Option } = Select;

const PrivilegeForm = ({ handleSubmit, name, email, phone, privilege, setName, setEmail, setPhone, setPrivilege }) => {

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Select
            bordered={false}
            placeholder="Select a Privilege"
            size="small"
            className="form-select mb-3"
            value={privilege}
            onChange={(value) => {
              setPrivilege(value);
            }}
          >
            <Option value={0}>High</Option>
            <Option value={1}>Medium</Option>
            <Option value={2}>Low</Option>
          </Select> 
        </div>

        <button type="submit" className="btn btn-danger">
          Save Changes
        </button>
      </form>
    </>
  );
};

export default PrivilegeForm;
