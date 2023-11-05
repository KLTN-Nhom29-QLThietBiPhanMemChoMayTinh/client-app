import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu.jsx";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_LOGIN,
  formatNameByHocVi,
  getStoreJSON,
} from "../../../util/config";
import { getUserLoginApi } from "../../../redux/reducers/userReducer";
import SubMenuLogout from "./SubMenuLogout";

const Nav = styled.div`
  background: #15171c;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  overflow: auto;
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 11;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ sidebar }) => (sidebar ? "block" : "none")};
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { userLogin } = useSelector((state) => state.userReducer);

  useEffect(() => {
    // truong hop redux khogn co data
    if (Object.keys(userLogin).length === 0) {
      // lay dât ở store
      let userStore = getStoreJSON(USER_LOGIN);

      // kiem tra data o store
      if (Object.keys(userStore).length === 0) {
        // TH Store khong co data
        navigate("/login");
      } else {
        // TH co data thi call theo maTK de tim thong tin nguoi dung
        dispatch(getUserLoginApi(userStore));
      }
    }
  }, []);

  // render
  const renderNameLogin = () => {
    if (Object.keys(userLogin).length === 0) {
      return "admin";
    }
    let { quyen } = userLogin.taiKhoan;

    if (quyen.tenQuyen.toLowerCase().includes("Giáo viên".toLowerCase())) {
      let gv = {
        hocVi: userLogin.hocVi,
        name: userLogin.hoTen,
      };
      return formatNameByHocVi(gv);
    } else {
      if (
        userLogin.chucVu.tenCV.toLowerCase().includes("quản lý".toLowerCase())
      ) {
        return "QL. " + userLogin.tenNV;
      }
      return "NV. " + userLogin.tenNV;
    }
  };

  //set user nao su dung, khong co thi day ve trang login

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // render
  const renderMenu = () => {
    if (Object.keys(userLogin).length === 0) {
      return <></>;
    }

    return SidebarData.map((item, index) => {

      let tenQuyen = userLogin?.taiKhoan.quyen.tenQuyen.toLowerCase();

      if (tenQuyen.includes("Người quản lý".toLowerCase())) {
        return <SubMenu item={item} key={index} note={0}/>;
      }

      if (
        tenQuyen.includes("Nhân viên".toLowerCase()) &&
        (item.valQuyen === 1 || item.valQuyen === 2)
      ) {
        return <SubMenu item={item} key={index} note={1} />;
      }

      if (tenQuyen.includes("Giáo viên".toLowerCase()) && item.valQuyen === 1) {
        return <SubMenu item={item} key={index} note={0} />;
      }
    });
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav className="" style={{ background: "#25c5fa" }}>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <div className="col-10 pe-4" style={{ textAlign: "right" }}>
            <NavLink className="text-decoration-none" to="/account">
              <BiIcons.BiUserCircle
                className="me-2"
                style={{ fontSize: "30px", color: "black" }}
              />
              <span className="text-white ">{renderNameLogin()}</span>
            </NavLink>
          </div>
        </Nav>
        <Overlay sidebar={sidebar} onClick={showSidebar} />
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {renderMenu()}

            <SubMenuLogout
              item={{
                title: "Đăng Xuất",
                path: "/",
                icon: (
                  <RiIcons.RiLogoutCircleRLine
                    style={{ marginBottom: "6px", fontSize: "25px" }}
                  />
                ),
              }}
            />
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
