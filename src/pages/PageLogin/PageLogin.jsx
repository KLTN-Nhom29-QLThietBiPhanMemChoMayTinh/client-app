import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup'
import { FaRegCopyright } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function PageLogin() {


  const dispatch = useDispatch();
  const REGEX_PASSWORD= /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{6,}$/;

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().trim().ensure()
              .required("Tài khoản không được bỏ trống!")
              .min(3,"Tài khoản trên 3 ký tự!")
              .matches(/^[a-z0-9_-]{3,16}$/, "Tài khoản không có ký tự đặc biệt!"),
              
      password: Yup.string().required("Mật khẩu không được bỏ trống!")
            .min(6, 'Mật khẩu từ 6 - 32 ký tự !')
            .max(32,'Mật khẩu từ 6 - 32 ký tự !')
            .matches(REGEX_PASSWORD, 'Mật khẩu có ít nhất một chữ số và một chữ cái!')
            
    }),
    onSubmit:(value) => {
      console.log("🚀 ~ file: PageLogin.jsx:17 ~ PageLogin ~ value:", value)
      
    }
  })

  return (
    <div
      className="d-flex flex-column justify-content-around align-items-center"
      style={{ color: "white", height: "100vh" }}
    >
      <h1>Hệ thông quản lý phòng máy công nghệ thông tin</h1>
      <form
        // action="#"
        // method="post"
        onSubmit={formik.handleSubmit}
        className="col-md-5 d-flex flex-column align-items-center p-3 opacity_05"
        style={{ height: "400px" }}
      >
        <h2 className="my-4 ">Đăng nhập</h2>

        <div className="mb-3 w-75 form-group">
          <label htmlFor="username" className="form-label ms-2 mb-0" >
            Tài khoản
            <small id="errUsername" className="form-text text_color_yellow ms-2">
              {formik.errors.username? formik.errors.username:'' }
            </small>
          </label>
          <input
            type="text"
            className="form-control border-info input_login py-2"
            name="username"
            id="username"
            aria-describedby="errUsername"
            placeholder="Nhập tài khoản..."
              // onBlur={formik.handleBlur}
              onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3 w-75 form-group">
          <label htmlFor="password" className="form-label ms-2 mb-0">
            Mật khẩu
            <small id="errPassword" className="form-text text_color_yellow ms-2" >
              {formik.errors.password ? formik.errors.password : ""}
            </small>
          </label>
          <input
            type="password"
            className="form-control border-info input_login py-2"
            name="password"
            id="password"
            aria-describedby="errPassword"
            placeholder="Nhập mật khẩu..."
            onChange={formik.handleChange}
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
