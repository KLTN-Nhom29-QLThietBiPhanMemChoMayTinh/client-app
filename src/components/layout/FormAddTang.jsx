import React, { useState } from "react";
import NavTab from "../common/NavTab/NavTab";

function FormAddTang() {
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
    alert(txtText);
  };

  return (
    <div className="container ">
      <div className="">
        {/*  */}
        <NavTab
          itemLink={{
            name: "Quản lý tầng",
            link: "/quan-ly/tang",
            chucNang: "Tạo mới",
          }}
        />
        {/* Form */}
        <div className=" bg-white p-4">
          <form onSubmit={handleSubmit} action="/quan-ly/tang">
            <div className="mb-3">
              <label htmlFor="txtnameTang" className="form-label">
                Tên tầng <span className="text-danger mx-2">{`${txtErr}`}</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="txtnameTang"
                aria-describedby="txtnameTang"
                // value={txtText}
                placeholder="Tầng 1..."
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
        <div>abc</div>
      </div>
    </div>
  );
}

export default FormAddTang;
