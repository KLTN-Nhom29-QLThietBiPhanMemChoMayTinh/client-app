import React from "react";
import PropTypes from "prop-types";
import { AiOutlineRight, AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
// import '../../assets/scss/styleQLKhuVuc.scss'

const PageQlKhuVuc = (props) => {
  return (
    <div className="container p-3">
      <h1 className="text-center text-danger">PageQlKhuVuc</h1>
      <hr />
      <div className="d-flex justify-content-start" style={{}}>
        {/*  */}
        <p>
          <NavLink style={{ textDecorationLine: "none" }} to="">
            <AiOutlineHome style={{ marginBottom: "5px", fontSize: "22px",  }} />{" "}
            Trang chủ
          </NavLink>
          <AiOutlineRight className="mx-1" />
          <NavLink to="/quan-ly/khu-vuc"> Khu vực </NavLink>
          <AiOutlineRight className="mx-1" />
          <span style={{ opacity: 0.7 }}>Danh sách </span>
        </p>

        {/*  */}
      </div>
    </div>
  );
};

PageQlKhuVuc.propTypes = {};

export default PageQlKhuVuc;
