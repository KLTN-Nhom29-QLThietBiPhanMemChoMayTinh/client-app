import React, { useState } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import { useDispatch } from "react-redux";
import { insertToaNha } from "../../../redux/reducers/toaNhaReducer";

function FormAddKhuVuc() {

  let dispatch = useDispatch();
  //
  let [txtText, setTxtText] = useState("");
  let [txtErr, setTxtErr] = useState("*");

  // lay gia trị của text name
  const handleChangeText = (event) => {
    let str = event.target.value
    if (str !== "") {
      setTxtErr("*")
     
    }
    setTxtText(str);
  };

  // su ly du kien submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (txtText === "") {
      setTxtErr("Hãy nhập dữ liệu !!!")
      return
    }
    dispatch(insertToaNha(txtText))
  };

    
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý tòa nhà", link: "../quan-ly/khu-vuc" }
    
  ];
  //
  
  return (

    <div className="container " style={{height:'100vh'}}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="">
        {/*  */}
        <NavTab
          itemLink={{
            arrLinkNavTab,
            chucNang: "Tạo mới",
          }}
        />
        {/* Form */}
        <div className=" bg-white p-4">
          <form onSubmit={handleSubmit} action="/quan-ly/khu-vuc">
            <div className="mb-3">
              <label htmlFor="txtnameKV" className="form-label">
                Tên khu vực <span className="text-danger mx-2">{`${txtErr}`}</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="txtnameKV"
                aria-describedby="txtnameKV"
                // value={txtText}
                placeholder="Tòa nhà a..."
                onChange={handleChangeText}
              />
            </div>

            <button type="submit" className="btn btn-success">
              Tạo mới
            </button>
            <button type="reset" className="btn btn-danger mx-3">
              Khôi phục
            </button>
          </form>
        </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default FormAddKhuVuc;
