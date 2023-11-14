import React, { useEffect, useState } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTangApi } from "../../../redux/reducers/tangReducer";

let obj_old = {};

const FormUpdateTang = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // nhan data gui theo uri
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const objParam = Object.fromEntries(searchParams);
  
  //
  let { arrTang } = useSelector((state) => state.tangReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);

  //
  /**
   * { tenTang: "", toaNha: [], }
   */
  let [objTang, setObjTang] = useState({ tenTang: "", toaNha: [] });
  let [txtErr, setTxtErr] = useState({
    tenTang: "",
    toaNha: "",
  });
  //
  useEffect(() => {
    if (objParam.id == null) {
      navigate("/quan-ly/tang");
    }
    if(arrTang.length === 0)
    {
      navigate("/quan-ly/tang");
    }

    let data = arrTang.filter((item) => {
      return item.maTang == objParam.id;
    });
    obj_old = {...data[0]}
    setObjTang(obj_old);

    
  }, []);

  // lay gia trị của text name
  const handleChangeText = (e) => {
    let str = e.target.value;
    if (str === "") {
      setTxtErr({ ...txtErr, tenTang: "Hãy nhập dữ liệu!" });
    } else {
      setTxtErr({ ...txtErr, tenTang: "" });
    }
    setObjTang({
      ...objTang,
      tenTang: str,
    });
  };
  //
  const handleChangeSelect = (e) => {
    let arrData = arrToaNha.filter((item) => item.maToaNha == e.target.value);

    setObjTang({
      ...objTang,
      toaNha: arrData[0],
    });
    if (e.target.value != -1) {
      setTxtErr({ ...txtErr, toaNha: "" });
    }
  };

  // su ly du kien submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkData()) {
      // false
      return;
    }
    // true

    if (obj_old === objTang) {
      alert('Thông tin không có gì thay đổi!');
      return
    }
    dispatch(updateTangApi(objTang));
  };
  //
  const checkData = () => {
    let result = true;
    let tenTang = "";
    let toaNha = "";

    if (objTang.tenTang.length === 0) {
      tenTang = "Hãy nhập dữ liệu!";
      result = false;
    }
    if (Object.keys(objTang.toaNha).length === 0) {
      toaNha = "Hãy chọn dữ liệu!";
      result = false;
    }
    setTxtErr({
      tenTang,
      toaNha,
    });
    return result;
  };

  //render
  const renderSelectToaNha = () => {
    if (Object.keys(objTang).length === 0) {
      return <></>;
    }
    return arrToaNha?.map((item, index) => {
      // <option selected>Select one</option>
      if (item.maToaNha == objTang.toaNha.maToaNha) {
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

  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý tòa nhà", link: "../quan-ly/khu-vuc" },
    { name: "Quản lý tầng", link: "/quan-ly/tang" },
  ];
  //
  return (
    <div className="container " style={{ height: "100vh" }}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="">
          {/*  */}
          <NavTab
            itemLink={{
              arrLinkNavTab,
              chucNang: "Chỉnh sửa",
            }}
          />
          {/* Form */}
          <div className=" bg-white p-4 ">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-6">
                  <div className="mb-3 col-10">
                    <label htmlFor="txtnameTang" className="form-label">
                      Tên tầng
                      <span className="text-danger mx-2">
                        *{`${txtErr.tenTang}`}
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control px-3 py-2"
                      id="txtnameTang"
                      aria-describedby="txtnameTang"
                      value={objTang?.tenTang}
                      placeholder="Tầng 1..."
                      onChange={handleChangeText}
                    />
                  </div>
                </div>
                {/*  select Toa nha */}
                <div className="col-6">
                  <div className="mb-3 col-10">
                    <label className="form-label">
                      Tòa nhà
                      <span className="text-danger mx-2">
                        *{`${txtErr.toaNha}`}
                      </span>
                    </label>
                    <select
                      onChange={handleChangeSelect}
                      className="form-select  px-3 py-2"
                    >
                      {renderSelectToaNha()}
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-success">
                Chỉnh sửa
              </button>
              <button type="reset"
               onClick={() =>{
                setObjTang({ tenTang: "", toaNha: arrToaNha[0] })
               }}
              className="btn btn-danger mx-3">
                Khôi phục
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default FormUpdateTang;
