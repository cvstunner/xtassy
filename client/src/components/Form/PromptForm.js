import React from "react";

const PromptForm = ({ handleSubmit, msg, btn }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 fw-bold fs-6 mb-1">
        {msg}
        </div>
        {
          btn == "delete" ? 
            (<>
              <button type="submit" className="btn btn-danger">
                {btn}
              </button>
            </>)
          : 
            (<>
              <button type="submit" className="btn btn-primary">
                {btn}
              </button>
            </>)
        }
      </form>
    </>
  );
};

export default PromptForm;
