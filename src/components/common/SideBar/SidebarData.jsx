import React from "react";
import { FaComputer } from "react-icons/fa6";
import { AiTwotoneHome } from "react-icons/ai";
import {
  IoMdBook,
  IoMdOptions,
  IoIosPaper,
  IoMdHelpCircle,
} from "react-icons/io";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineScience, MdManageAccounts } from "react-icons/md";
import { SiJirasoftware } from "react-icons/si";
import { PiArticleNyTimesLight } from "react-icons/pi";
import { FaUserFriends, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Trang chủ",
    path: "/detail-khu-vuc/1",
    icon: <AiTwotoneHome style={{ marginBottom: "6px", fontSize: "25px" }} />,
  },
  {
    title: "Quản Lý",
    // path: '',
    icon: <IoMdOptions style={{ marginBottom: "6px", fontSize: "25px" }} />,
    iconClosed: (
      <RiArrowDownSFill style={{ marginBottom: "6px", fontSize: "20px" }} />
    ),
    iconOpened: (
      <RiArrowUpSFill style={{ marginBottom: "6px", fontSize: "20px" }} />
    ),

    subNav: [
      {
        title: "Tòa nhà",
        path: "/quan-ly/khu-vuc",
        icon: (
          <FaMapMarkedAlt style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Tầng",
        path: "/quan-ly/tang",
        icon: (
          <FaMapMarkedAlt style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Phòng máy",
        path: "/quan-ly/phong",
        icon: <FaComputer style={{ marginBottom: "6px", fontSize: "25px" }} />,
      },
      {
        title: "Thiết bị",
        path: "/quan-ly/thiet-bi",
        icon: <FaComputer style={{ marginBottom: "6px", fontSize: "25px" }} />,
      },
      {
        title: "Phần mềm",
        path: "/quan-ly/phan-mem",
        icon: (
          <SiJirasoftware style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Khoa",
        path: "/quan-ly/khoa",
        icon: (
          <MdOutlineScience style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Môn học",
        path: "/quan-ly/mon",
        icon: <IoMdBook style={{ marginBottom: "6px", fontSize: "25px" }} />,
      },
      {
        title: "Giáo viên",
        path: "/quan-ly/giao-vien",
        icon: (
          <LiaChalkboardTeacherSolid
            style={{ marginBottom: "6px", fontSize: "25px" }}
          />
        ),
      },
      {
        title: "Nhân viên",
        path: "/quan-ly/nhan-vien",
        icon: (
          <FaUserFriends style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Tài khoản",
        path: "/quan-ly/tai-khoan",
        icon: <FaUsers style={{ marginBottom: "6px", fontSize: "25px" }} />,
      },
    ],
  },
  {
    title: "Phân công lịch",
    // path: '/phan-cong',
    icon: <IoIosPaper style={{ marginBottom: "6px", fontSize: "25px" }} />,
    iconClosed: (
      <RiArrowDownSFill style={{ marginBottom: "6px", fontSize: "20px" }} />
    ),
    iconOpened: (
      <RiArrowUpSFill style={{ marginBottom: "6px", fontSize: "20px" }} />
    ),

    subNav: [
      {
        title: "Lịch trực",
        path: "/phan-cong/lich-truc",
        icon: <IoIosPaper style={{ marginBottom: "6px", fontSize: "25px" }} />,
        cName: "sub-nav",
      },
      {
        title: "Lịch thực hành",
        path: "/phan-cong/lich-thuc-hanh",
        icon: <IoIosPaper style={{ marginBottom: "6px", fontSize: "25px" }} />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Thông tin tài khoản",
    path: "/account",
    icon: (
      <MdManageAccounts style={{ marginBottom: "6px", fontSize: "25px" }} />
    ),
  },
  {
    title: "Thời khóa biểu",
    path: "/thoi-khoa-bieu",
    icon: (
      <PiArticleNyTimesLight
        style={{ marginBottom: "6px", fontSize: "25px" }}
      />
    ),
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoMdHelpCircle style={{ marginBottom: "6px", fontSize: "25px" }} />,
  },
];
