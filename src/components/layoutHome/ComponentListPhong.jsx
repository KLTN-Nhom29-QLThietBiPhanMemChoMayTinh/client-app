import React, { useRef } from "react";
import { FaHandPointRight } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setObjThongTinByPhongMay } from "../../redux/reducers/homeReducer";

export default function ComponentListPhong() {

  const dispatch = useDispatch();

  //
  let { objThongTin, arrPhongH } = useSelector((state) => state.homeReducer);

  const numberNextPagePhong = useRef(1);

  //handle
  const handleBtnPhongMay = (valPhong) => {
    dispatch(setObjThongTinByPhongMay(valPhong))
  } 

  // render
  const renderArrPhongHome = () => {
    return arrPhongH?.map((item, index) => {
      const renderBtnClickPhong = () => {
        if (item.maPhong === objThongTin.phong.maPhong) {
          return <FaHandPointRight className="ms-2" size={15} />;
        }
        return <></>;
      };

      //
      return (
        <div
          key={index}
          className="bg-success rounded   my-2 ms-2 "
          style={{ minHeight: "89px" }}
        >
          <div className="d-flex flex-column justify-content-between h-100">
            <span
              className=" flex-grow-1 text-center  pt-2 "
              style={{ width: "110px", height: "80%" }}
            >
              {item.tenPhong}
            </span>
            {/* Khiểm soát trang thái lớp có đang học hay không  */}
            <span className="text-center p-1" style={{ fontSize: "12px" }}>
              {item.trangThai ? "Đang Học" : ""}
            </span>
            <button
              className="btn btn-success border-top border-0  rounded-0 rounded-bottom border-dark m-0 "
              style={{ fontSize: "13px", padding: "5px" }}
              onClick={() => {handleBtnPhongMay(item)}}
            >
              Chi tiết
              {renderBtnClickPhong()}
            </button>
          </div>
        </div>
      );
    });
  };
  //

  //
  return (
    <div
      className="border border-info rounded  mb-2 text-white over_flow_auto"
      style={{ maxHeight: "20%" }}
    >
      <div className="d-flex justify-content-between">
        <div className=" d-flex flex-row">
          {/* item */}

          {renderArrPhongHome()}
          {/*  */}
        </div>
        {/* btn chuyển page cho Phong */}
        <div className="d-flex flex-column justify-content-between m-2 ">
          <button
            type="button"
            className="btn btn-primary px-0"
            onClick={() => {
              numberNextPagePhong.current += 1;
            }}
          >
            <MdKeyboardDoubleArrowUp size={28} />
          </button>
          <button
            type="button"
            className="btn btn-primary px-0"
            onClick={() => {
              if (numberNextPagePhong.current > 1) {
                numberNextPagePhong.current -= 1;
              }
            }}
          >
            <MdKeyboardDoubleArrowDown size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
