import React, { useRef } from "react";
import { FaComputer } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { AiOutlineRight } from "react-icons/ai";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

export default function PageHome() {
  //   $(document).ready(function() {
  //     $('#example').dataTable( {
  //         "scrollX": true
  //     } );
  // } );
  const numberNextPageTang = useRef(1);
  const numberNextPagePhong = useRef(1);

  return (
    <div
      className="row p-2 d-flex justify-content-between bg-light  w-100"
      style={{ height: "100vh", margin: "0px" }}
    >
      {/*1. col Toa nha -- Tang */}
      <div className="col-2  flex-column d-flex justify-content-between px-1">
        {/* select toa nha */}
        <div className=" d-flex align-items-center" style={{ height: "100px" }}>
          <select className="form-select form-select-lg">
            <option selected>Tòa nhà A</option>
            <option value>Tòa nhà B</option>
            <option value>Tòa nhà C</option>
          </select>
        </div>
        {/* List tang */}
        <div
          className=" border border-info rounded mt-3 flex-grow-1  d-flex flex-column justify-content-between "
          // style={{ maxHeight: "75vh", minHeight: "auto" }}
          style={{ maxHeight: "518px" }}
        >
          <div className="d-flex flex-column ">
            {/* item */}
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">
              Tầng 1
            </button>
          </div>

          {/* btn chuyển page cho Tang */}
          <div className="row m-2">
            <button
              type="button"
              className="btn btn-primary col p-0 mx-1"
              onClick={() => {
                if (numberNextPageTang.current > 1) {
                  numberNextPageTang.current -= 1;
                }
              }}
            >
              <MdKeyboardDoubleArrowLeft size={28} />
            </button>
            <button
              type="button"
              className="btn btn-primary col p-0 mx-1"
              onClick={() => {
                numberNextPageTang.current += 1;
              }}
            >
              <MdOutlineKeyboardDoubleArrowRight size={28} />
            </button>
          </div>
        </div>

        <div></div>
        <div></div>
        <div></div>
      </div>

      {/*1. Col2 phong - CT Phong  */}
      <div className="col-7  px-2 " style={{ height: "100%" }}>
        <div className="flex-column d-flex " style={{ height: "100%" }}>
          {/* list Phong  */}
          <div
            className="border border-info rounded  mb-2 text-white over_flow_auto"
            style={{ maxHeight: "20%" }}
          >
            <div className="d-flex justify-content-between">
              <div className=" d-flex flex-row">
                {/* item */}

                <div
                  className="bg-success rounded   my-2 ms-2 "
                  style={{ height: "90px" }}
                >
                  <div className="d-flex flex-column">
                    <span
                      className=" flex-grow-1 text-center  pt-2 "
                      style={{ width: "110px" }}
                    >
                      Phòng máy H3.1.1
                    </span>
                    <button
                      className="btn btn-success border-top border-0  rounded-0 rounded-bottom border-dark "
                      style={{ fontSize: "13px", padding: "5px" }}
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
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
          {/* List Detail Phong */}
          <div
            className="border border-info rounded mx-2 flex-grow-1 "
            style={{ height: "80%" }}
          >
            <div className="   over_flow_auto " style={{ height: "100%" }}>
              <div className="d-flex align-content-start flex-wrap">
                {/* item */}
                <div
                  className=" card  align-items-center my-2 ms-2 "
                  style={{ width: "170px", height: "170px" }}
                >
                  <div className="card-body text-center p-2">
                    <FaComputer size={50} />
                    <h4
                      className="pt-2 px-3"
                      style={{ fontSize: "20px", fontWeight: "600" }}
                    >
                      May tính H3.1.1
                    </h4>
                    <button className="btn btn-success w-100">Chi tiết</button>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*1. Col3 Thongo tin  */}
      <div
        className="col-3 border border-info rounded p-2 "
        style={{ height: "100%" }}
      >
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "100%" }}
        >
          <div className="">
            <h3 style={{ fontWeight: 600 }}>Thông tin chi tiết</h3>
          </div>
          <div className="h-100 mb-2 over_flow_auto">
            <div className="pt-2">
              <h5 style={{ fontWeight: 600 }}>Tòa nhà A - Tầng 3 </h5>
            </div>
            <div className="pt-2">
              <span className="h5" style={{ fontWeight: 600 }}>
                Phòng H3.1
              </span>
              <div>
                <span style={{ fontWeight: 600 }}>- Giáo viên dạy: </span>
                <span>Trần bảo bình</span>
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>- Môn học: </span>
                <span>Hệ thống thông tin</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="h5" style={{ fontWeight: 600 }}>
                Máy tính H3.1.1
              </span>
              <div>
                <span style={{ fontWeight: 600 }}>- Thiết bị phần cứng: </span> <br />
                <li className="ms-3">Hệ thống thông tin</li>
                <li className="ms-3">Hệ thống thông tin</li>
                <li className="ms-3">Hệ thống thông tin</li>
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>- Ứng dụng phần mềm: </span> <br />
                <li className="ms-3">Hệ thống thông tin</li>
                <li className="ms-3">Hệ thống thông tin</li>
                <li className="ms-3">Hệ thống thông tin</li>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <button type="button" className="btn btn-primary">
              Chi tiết
            </button>
            <button type="button" className="btn btn-primary">
              Chỉnh sửa
            </button>
            <button type="button" className="btn btn-primary">
              Ghi chú
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
