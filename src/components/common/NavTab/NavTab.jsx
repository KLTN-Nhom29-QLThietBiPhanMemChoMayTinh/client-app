import React from 'react'
import { AiOutlineRight, AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";

function NavTab(props) {
    // itemLink=    {name:'Khu vực', chucNang:'Danh sách'}

    /**
     * name: chi nơi ở hiên tại 
     * chucNang: xe hiện ra ở component này
     */
    let {name,chucNang} = props.itemLink;


  return (
    <div className='py-4 px-3'>
      <div className="d-flex justify-content-start">
          <NavLink style={{ textDecorationLine: "none" }} to="../../">
            <AiOutlineHome style={{ marginBottom: "5px", fontSize: "22px",  }} />{" "}
            Trang chủ
          </NavLink>
          <AiOutlineRight className="mx-1 mt-1" />
          <NavLink style={{ textDecorationLine: "none", marginTop:'1px' }} to="">{name}</NavLink>
          <AiOutlineRight className="mx-1 mt-1" />
          <span style={{ opacity: 0.7, marginTop:'1px' }}>{chucNang}</span>
        </div>
    </div>
  ) 
}

export default NavTab
