import PropTypes from "prop-types";
import React, { useState } from "react";
import NavTab from "../common/NavTab/NavTab";
import Footer from "../common/Footer/Footer";

const FormUpdateTang = (props) => {
  console.log(
    "🚀 ~ file: FormUpdateTang.jsx:8 ~ FormUpdateTang ~ props:",
    props
  );
  let [txtText, setTxtText] = useState("");
  let [txtErr, setTxtErr] = useState("*");

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
    alert(txtText);
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý khu vực", link: "../quan-ly/khu-vuc" },
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
              chucNang: "Cập nhật",
            }}
          />
          {/* Form */}
          <div className=" bg-white p-4">
            <form onSubmit={handleSubmit} action="/quan-ly/tang">
              <div className="mb-3">
                <label htmlFor="txtnameTang" className="form-label">
                  Tên tầng{" "}
                  <span className="text-danger mx-2">{`${txtErr}`}</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtnameTang"
                  aria-describedby="txtnameTang"
                  placeholder="tầng a..."
                  onChange={handleChangeText}
                />
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button type="reset" className="btn btn-danger mx-3">
                Reset
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
