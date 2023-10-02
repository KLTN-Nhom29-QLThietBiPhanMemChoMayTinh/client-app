import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as LiaIcons from 'react-icons/lia';
import * as MdIcons from 'react-icons/md';
import * as Si from 'react-icons/si';
import * as PiIcons from 'react-icons/pi';

export const SidebarData = [
    
  {
    title: 'Trang chủ',
    path: '/',
    icon: <AiIcons.AiTwotoneHome style={{marginBottom:'6px', fontSize:'25px'}} />
  },
  {
    title: 'Quản Lý',
    // path: '',
    icon: <IoIcons.IoMdOptions style={{marginBottom:'6px', fontSize:'25px'}} />,
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginBottom:'6px', fontSize:'20px'}}  />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginBottom:'6px', fontSize:'20px'}} />,

    subNav: [
      {
        title: 'Khu vực',
        path: '/quan-ly/khu-vuc',
        icon: <FaIcons.FaMapMarkedAlt style={{marginBottom:'6px', fontSize:'25px'}} />
      },
      {
        title: 'Tầng',
        path: '/quan-ly/tang',
        icon: <FaIcons.FaMapMarkedAlt style={{marginBottom:'6px', fontSize:'25px'}} />
      },
      {
        title: 'Phòng máy',
        path: '/quan-ly/phong',
        icon: <Fa6Icons.FaComputer style={{marginBottom:'6px', fontSize:'25px'}} />
      },
      {
        title: 'Thiết bị',
        path: '/quan-ly/thiet-bi',
        icon: <Fa6Icons.FaComputer style={{marginBottom:'6px', fontSize:'25px'}} />
      },
      {
        title: 'Phần mềm',
        path: '/quan-ly/phan-mem',
        icon: <Si.SiJirasoftware style={{marginBottom:'6px', fontSize:'25px'}} />
      },
      {
        title: 'Khoa',
        path: '/quan-ly/khoa',
        icon: <MdIcons.MdOutlineScience style={{marginBottom:'6px', fontSize:'25px'}} />
      },
      {
        title: 'Môn học',
        path: '/quan-ly/mon',
        icon: <IoIcons.IoMdBook style={{marginBottom:'6px', fontSize:'25px'}} />
      },
      {
        title: 'Giáo viên',
        path: '/quan-ly/giao-vien',
        icon: <LiaIcons.LiaChalkboardTeacherSolid style={{marginBottom:'6px', fontSize:'25px'}} />
      }

    ]
  },
  {
    title: 'Phân công lịch',
    // path: '/phan-cong',
    icon: <IoIcons.IoIosPaper style={{marginBottom:'6px', fontSize:'25px'}} />,
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginBottom:'6px', fontSize:'20px'}} />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginBottom:'6px', fontSize:'20px'}} />,

    subNav: [
      {
        title: 'Lịch trực',
        path: '/phan-cong/lich-truc',
        icon: <IoIcons.IoIosPaper style={{marginBottom:'6px', fontSize:'25px'}} />,
        cName: 'sub-nav'
      },
      {
        title: 'Lịch thực hành',
        path: '/phan-cong/lich-thuc-hanh',
        icon: <IoIcons.IoIosPaper style={{marginBottom:'6px', fontSize:'25px'}}  />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Thông tin tài khoản',
    path: '/account',
    icon: <MdIcons.MdManageAccounts style={{marginBottom:'6px', fontSize:'25px'}}  />
  },
  {
    title: 'Thời khóa biểu',
    path: '/thoi-khoa-bieu',
    icon: <PiIcons.PiArticleNyTimesLight style={{marginBottom:'6px', fontSize:'25px'}} />
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle style={{marginBottom:'6px', fontSize:'25px'}} />
  }

];
