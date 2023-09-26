import React from "react";
import PropTypes from "prop-types";
import { AiOutlineRight, AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import NavTab from "../../components/common/NavTab/NavTab";

const PageQlKhuVuc = (props) => {
  return (
    <div className="container">
      <h1 className="text-center text-danger">PageQlKhuVuc</h1>
      <hr />


      <NavTab itemLink={
        {name:'Quản lý khu vực', chucNang:'Danh sách'}
        } />
      <div className="bg-white w h-100">a</div>
      <div className="p-4"></div>
    </div>
  );
};

PageQlKhuVuc.propTypes = {};

export default PageQlKhuVuc;
