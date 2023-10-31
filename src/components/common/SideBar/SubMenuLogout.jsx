import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  ACCESS_TOKEN,
  USER_LOGIN,
  clearCookie,
  clearLocalStorage,
} from "../../../util/config";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #69d6fa;
    cursor: pointer;
    margin-top: 2px;
    color: #69d6fa;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  margin-top: 1px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #252831;
    cursor: pointer;
    margin-top: 2px;
    color: #69d6fa;
  }
`;

const SubMenuLogout = ({ item }) => {
  const handleLogout = () => {
      clearLocalStorage(USER_LOGIN);
      clearCookie(ACCESS_TOKEN);
  };

  return (
    <>
      <SidebarLink to={item.path} onClick={handleLogout}>
        <div>
          {/* {item.icon} */}
          {item.SidebarLinkicon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarLink>
    </>
  );
};

export default SubMenuLogout;
