import React from "react";

const Prompt = ({ msg, btn, btnMsg, closePrompt, handler}) => {
  return (
    <>
      <div>
        <div className="mb-3 fw-bold fs-6 mb-1">
        {msg}
        </div>
        {
          btn == "delete" ? 
            (<>
              <button className="btn btn-danger" onClick={handler}>
                {btnMsg ? btnMsg : btn}
              </button>
            </>)
          : 
            (<>
              <button className="btn btn-primary" onClick={handler}>
                {btnMsg ? btnMsg : btn}
              </button>
            </>)
        }
        <button className="btn btn-secondary ms-2" onClick={closePrompt}>
          cancel
        </button>
      </div>
    </>
  );
};

export default Prompt;
