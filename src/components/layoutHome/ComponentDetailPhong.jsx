import React from "react";
import { FaComputer } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setObjThongTinByMay } from "../../redux/reducers/homeReducer";

export default function ComponentDetailPhong() {
  const dispatch = useDispatch();

  //
  let { arrMayTinhH, objThongTin } = useSelector((state) => state.homeReducer);

  // handle
  const handleBtnChiTietMay = (valMay) => {
    dispatch(setObjThongTinByMay(valMay));
  };
  //render
  const renderArrMayTinh = () => {
    return arrMayTinhH?.map((item, index) => {
      let colorText = "black";
      if (
        !item.trangThai.toLowerCase().includes("Đang hoạt động".toLowerCase())
      ) {
        colorText = "red";
      }
      let colorBorder = "";

      let { mayTinh } = objThongTin;
      if (mayTinh != null && item.maMay === mayTinh.maMay) {
        colorBorder = "border-primary";
      }

      //
      return (
        <button
          onClick={() => {
            handleBtnChiTietMay(item);
          }}
          key={index}
          className={`card  align-items-center my-3 ms-4 ${colorBorder}`}
          style={{ width: "150px", height: "150px" }}
        >
          <div className="card-body text-center p-2">
            <FaComputer size={50} />
            <h4
              className="pt-3 px-4"
              style={{
                fontSize: "20px",
                color: `${colorText}`,
                fontWeight: "600",
              }}
            >
              {item.moTa}
            </h4>
          </div>
        </button>
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
