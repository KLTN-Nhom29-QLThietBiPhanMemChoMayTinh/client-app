import React, { useEffect, useRef } from "react";
import { FaHandPointRight } from "react-icons/fa";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function ComponentToaNhaAndTang() {
  let {
    objThongTin,
    arrToaNhaH,
    arrTangH,
  } = useSelector((state) => state.homeReducer);

  const numberNextPageTang = useRef(1);

  // handle
  const handleChangeToaNha = (e) => {
    console.log("🚀 ~ file: PageHome.jsx:33 ~ handleChangeToaNha ~ e:", e);
  };

  // render
  const renderToaNha = () => {
    if(Object.keys(objThongTin).length === 0) {
        return <option selected value='a1'>
        All
      </option>
      }
    return arrToaNhaH?.map((item, index) => {
      if (item.maToaNha === objThongTin?.tang.toaNha.maToaNha) {
        return (
          <option key={index} selected value={item.maToaNha}>
            {item.tenToaNha}
          </option>
        );
      }
      return (
        <option key={index} value={item.maToaNha}>
          {item.tenToaNha}
        </option>
      );
    });
  };
  //
  const renderArrTangH = () => {
    return arrTangH?.map((item, index) => {
      if (item.maTang === objThongTin?.tang.maTang) {
        return (
          <button
            type="button"
            key={index}
            className="btn btn-primary  mx-2 mt-2"
          >
            {item.tenTang}
            <FaHandPointRight className="ms-2" size={15} />
          </button>
        );
      }

      return (
        <button
          type="button"
          key={index}
          className="btn btn-primary  mx-2 mt-2"
        >
          {item.tenTang}
        </button>
      );
    });
  };

  //
  return (
    <>
      {/* select toa nha */}
      <div
        className=" d-flex align-items-center"
        style={{ minHeight: "100px" }}
      >
        <select
          onChange={handleChangeToaNha}
          className="form-select form-select-lg"
        >
          {renderToaNha()}
          {/* <option selected>Tòa nhà A</option>
            <option value>Tòa nhà B</option>
            <option value>Tòa nhà C</option> */}
        </select>
      </div>
      {/* List tang */}
      <div
        className=" border border-info rounded mt-3 flex-grow-1  d-flex flex-column justify-content-between "
        // style={{ maxHeight: "75vh", minHeight: "auto" }}
        style={{ maxHeight: "460px", minHeight: "auto" }}
      >
        <div className="d-flex flex-column ">
          {/* item */}

          {renderArrTangH()}
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
    </>
  );
}
