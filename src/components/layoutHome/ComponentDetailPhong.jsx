import React from "react";
import { FaComputer } from "react-icons/fa6";
import { useSelector } from "react-redux";


export default function ComponentDetailPhong() {
  let { arrMayTinhH } = useSelector((state) => state.homeReducer);

  //
  const renderArrMayTinh = () => {
    return arrMayTinhH?.map((item, index) => {
      return (
        <div
          key={index}
          className=" card  align-items-center my-2 ms-2 "
          style={{ width: "170px", height: "170px" }}
        >
          <div className="card-body text-center p-2">
            <FaComputer size={50} />
            <h4
              className="pt-2 px-4"
              style={{ fontSize: "20px", fontWeight: "600" }}
            >
              {item.moTa}
            </h4>
            <button className="btn btn-success w-100">Chi tiết</button>
          </div>
        </div>
      );
    });
  };
  //

  //
  return (
    <div
      className="border border-info rounded mx-2 flex-grow-1 "
      style={{ height: "80%" }}
    >
      <div className="   over_flow_auto " style={{ height: "100%" }}>
        <div className="d-flex align-content-start flex-wrap">
          {/* item */}

          {renderArrMayTinh()}
          {/*  */}
        </div>
      </div>
    </div>
  );
}
