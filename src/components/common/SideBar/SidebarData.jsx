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
import { MdOutlineScience, MdManageAccounts, MdOutlineMeetingRoom } from "react-icons/md";
import { SiJirasoftware } from "react-icons/si";
import { PiArticleNyTimesLight,PiComputerTowerDuotone } from "react-icons/pi";
import { FaUserFriends, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Trang chủ",
    path: "/home",
    icon: <AiTwotoneHome style={{ marginBottom: "6px", fontSize: "25px" }} />,
    valQuyen: 1,
  },
  {
    title: "Quản Lý",
    // path: '',
    icon: <IoMdOptions style={{ marginBottom: "6px", fontSize: "25px" }} />,
    valQuyen: 2,
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
        valQuyen: 2,
        icon: (
          <FaMapMarkedAlt style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Tầng",
        path: "/quan-ly/tang",
        valQuyen: 2,
        icon: (
          <FaMapMarkedAlt style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Phòng máy",
        path: "/quan-ly/phong",
        valQuyen: 2,
        icon: <MdOutlineMeetingRoom style={{ marginBottom: "6px", fontSize: "25px" }} />,
      },
      {
        title: "Máy tính",
        path: "/quan-ly/may-tinh",
        valQuyen: 2,
        icon: <FaComputer style={{ marginBottom: "6px", fontSize: "25px" }} />,
      },
      {
        title: "Thiết bị",
        path: "/quan-ly/thiet-bi",
        valQuyen: 2,
        icon: <PiComputerTowerDuotone style={{ marginBottom: "6px", fontSize: "25px" }} />,
      },
      {
        title: "Phần mềm",
        path: "/quan-ly/phan-mem",
        valQuyen: 2,
        icon: (
          <SiJirasoftware style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Khoa",
        path: "/quan-ly/khoa",
        valQuyen: 2,
        icon: (
          <MdOutlineScience style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Môn học",
        path: "/quan-ly/mon",
        valQuyen: 2,
        icon: <IoMdBook style={{ marginBottom: "6px", fontSize: "25px" }} />,
      },
      {
        title: "Giáo viên",
        path: "/quan-ly/giao-vien",
        valQuyen: 2,
        icon: (
          <LiaChalkboardTeacherSolid
            style={{ marginBottom: "6px", fontSize: "25px" }}
          />
        ),
      },
      {
        title: "Nhân viên",
        path: "/quan-ly/nhan-vien",
        valQuyen: 3,
        icon: (
          <FaUserFriends style={{ marginBottom: "6px", fontSize: "25px" }} />
        ),
      },
      {
        title: "Tài khoản",
        path: "/quan-ly/tai-khoan",
        valQuyen: 3,
        icon: <FaUsers style={{ marginBottom: "6px", fontSize: "25px" }} />,
      },
    ],
  },
  {
    title: "Phân công lịch",
    // path: '/phan-cong',
    icon: <IoIosPaper style={{ marginBottom: "6px", fontSize: "25px" }} />,
    valQuyen: 2,
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
        valQuyen: 2,
        icon: <IoIosPaper style={{ marginBottom: "6px", fontSize: "25px" }} />,
        cName: "sub-nav",
      },
      {
        title: "Lịch thực hành",
        path: "/phan-cong/lich-thuc-hanh",
        valQuyen: 2,
        icon: <IoIosPaper style={{ marginBottom: "6px", fontSize: "25px" }} />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Thống kê",
    path: "/thong-ke",
    valQuyen: 1,
    icon: (
      <PiArticleNyTimesLight
        style={{ marginBottom: "6px", fontSize: "25px" }}
      />
    ),
  },
  {
    title: "Thông tin tài khoản",
    path: "/account",
    valQuyen: 1,
    icon: (
      <MdManageAccounts style={{ marginBottom: "6px", fontSize: "25px" }} />
    ),
  },
  // {
  //   title: "Support",
  //   path: "/support",
  //   valQuyen: 1,
  //   icon: <IoMdHelpCircle style={{ marginBottom: "6px", fontSize: "25px" }} />,
  // },
];
