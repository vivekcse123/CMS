import React from "react";
import spinnerImg from "../../assets/img/loading.gif";
let Spinner = () => {
  return (
    <>
      <img src={spinnerImg}  className="d-block m-auto" alt="" style={{width: '120px', height: '120px'}}/>
    </>
  );
};
export default Spinner;
