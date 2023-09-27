import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu.jsx";
import { IconContext } from "react-icons/lib";

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
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav className="" style={{ background: "#25c5fa" }}>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <div className="col-10 pe-4" style={{ textAlign: "right" }}>
            <BiIcons.BiUserCircle
              className="me-2"
              style={{ fontSize: "30px", color: "black" }}
            />
            Admin
          </div>
        </Nav>
        <Overlay sidebar={sidebar} onClick={showSidebar} />
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}

            <SubMenu
              item={{
                title: "Đăng Xuất",
                path: "/logout",
                icon: (
                  <RiIcons.RiLogoutCircleRLine
                    style={{ marginBottom: "6px", fontSize: "25px" }}
                  />
                ),
              }}
              key={"index"}
            />
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
