import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllToaNhaApi, updateToaNha } from "../../../redux/reducers/toaNhaReducer";

let objToaNha = {};
let soTang = 0;

const FormKhuVucUpdate = (props) => {
  
  // sd useParams de nhan data truyen toi theo router
  const params = useParams();
  const dispatch = useDispatch();
  
  // nhan data gui theo uri
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const objParam = Object.fromEntries(searchParams);
  //
  let {arrToaNha} = useSelector(state => state.toaNhaReducer);
  // khai bao
  let [txtText, setTxtText] = useState("");
  let [txtErr, setTxtErr] = useState("*");

  useEffect(() => {
    if(arrToaNha.length === 0)
    {
      dispatch(getAllToaNhaApi)
      console.log("Can api tim Toa Nha theo ID");
    }else{
      let arrTN = arrToaNha.filter(item => item.maToaNha == objParam.id)
      objToaNha = arrTN[0];
      
    }
    soTang = objToaNha.soTang;
    setTxtText(objToaNha.tenToaNha)
  }, [])

  // lay gia trị của text name
  const handleChangeText = (event) => {
    let str = event.target.value;
    if (str !== "") {
      setTxtErr("*");
    }
    setTxtText(str);
  };

  // su ly du kien submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (txtText === "") {
      setTxtErr("Hãy nhập dữ liệu !!!");
      return;
    }
    let toaNha = {
      maToaNha:objParam.id,
      tenToaNha:txtText,
      soTang
    }

    dispatch(updateToaNha(toaNha));
  
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý khu vực", link: "../../quan-ly/khu-vuc" }];
  //

  return (
    <div className="container " style={{ height: "100vh" }}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="">
          {/*  */}
          <NavTab
            itemLink={{
              arrLinkNavTab,
              chucNang: "Cập nhật",
            }}
          />
          {/* Form */}
          <div className=" bg-white p-4">
            <form onSubmit={handleSubmit} action="/quan-ly/khu-vuc">
              <div className="mb-3">
                <label htmlFor="txtnameKV" className="form-label">
                  Tên khu vực{" "}
                  <span className="text-danger mx-2">{`${txtErr}`}</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtnameKV"
                  value={txtText}
                  aria-describedby="txtnameKV"
                  placeholder="Tòa nhà a..."
                  onChange={handleChangeText}
                />
              </div>

              <button type="submit" className="btn btn-success">
                Cập nhật
              </button>
              <button type="reset" onClick={() => {
                setTxtText(objToaNha.tenToaNha)
              }} className="btn btn-danger mx-3">
                Làm mới
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default FormKhuVucUpdate;
