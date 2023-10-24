import React from "react";
import { FaRegCopyright } from "react-icons/fa";

export default function PageLogin() {
  return (
    <div
      className="d-flex flex-column justify-content-around align-items-center"
      style={{ color: "white", height: "100vh" }}
    >
      <h1>Hệ thông quản lý phòng máy công nghệ thông tin</h1>
      <form
        action="#"
        method="post"
        className="col-md-5 d-flex flex-column align-items-center p-3 opacity_05"
        style={{ height: "400px" }}
      >
        <h2 className="my-4 ">Đăng nhập</h2>

        <div className="mb-3 w-75 form-group">
          <label htmlFor="username" className="form-label ms-2 mb-0" >
            Tài khoản
            <small id="errUsername" className="form-text text-danger ms-2">
              {/* {formik.errors.email? formik.errors.email:'' } */}
            </small>
          </label>
          <input
            type="text"
            className="form-control border-info input_login py-2"
            name="username"
            id="username"
            aria-describedby="errUsername"
            placeholder="Nhập tài khoản..."
            //   onBlur={formik.handleBlur}
            //   onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3 w-75 form-group">
          <label htmlFor="password" className="form-label ms-2 mb-0">
            Mật khẩu
            <small id="errPassword" className="form-text text-danger ms-2">
              {/* {formik.errors.password ? formik.errors.password : ""} */}
            </small>
          </label>
          <input
            type="password"
            className="form-control border-info input_login py-2"
            name="password"
            id="password"
            aria-describedby="errPassword"
            placeholder="Nhập mật khẩu..."
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
          />
        </div>

        <div className="w-75  mb-3 ">
          <input type="checkbox" id="brand1" defaultValue />
          <label htmlFor="brand1" className="ms-2">
            Ghi nhớ tài khoản
          </label>
        </div>

        <div className="py-4">
          <input
            type="submit"
            className="btn btn-info px-3 "
            value="Đăng nhập"
          />
        </div>
      </form>
      <div className="">
        <span className="fw-bold opacity-75">
          Copyright <FaRegCopyright /> 2023 - Nguyễn văn Hoàng -- Phạm lê Thành
        </span>
      </div>
    </div>
  );
}
