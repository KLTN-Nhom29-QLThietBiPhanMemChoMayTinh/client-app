import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as LiaIcons from 'react-icons/lia';

export const SidebarData = [
    
  {
    title: 'Trang chủ',
    path: '/',
    icon: <AiIcons.AiTwotoneHome style={{marginBottom:'6px', fontSize:'25px'}} />
  },
  {
    title: 'Quản Lý',
    path: '/quanly',
    icon: <IoIcons.IoMdOptions style={{marginBottom:'6px', fontSize:'25px'}} />,
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginBottom:'6px', fontSize:'20px'}}  />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginBottom:'6px', fontSize:'20px'}} />,

    subNav: [
      {
        title: 'Khu vực',
        path: '/quanly/khuvuc',
        icon: <FaIcons.FaMapMarkedAlt />
      },
      {
        title: 'Phòng máy',
        path: '/quanly/phong',
        icon: <Fa6Icons.FaComputer />
      },
      {
        title: 'Thiết bị',
        path: '/quanly/thietbi',
        icon: <Fa6Icons.FaComputer />
      },
      {
        title: 'Thiết bị',
        path: '/quanly/thietbi',
        icon: <Fa6Icons.FaComputer />
      },
      {
        title: 'Phần mềm',
        path: '/quanly/phanmem',
        icon: <Fa6Icons.FaComputer />
      },
      {
        title: 'Khoa',
        path: '/quanly/khoa',
        icon: <Fa6Icons.FaComputer />
      },
      {
        title: 'Môn học',
        path: '/quanly/Mon',
        icon: <Fa6Icons.FaComputer />
      },
      {
        title: 'Giáo viên',
        path: '/quanly/giaovien',
        icon: <LiaIcons.LiaChalkboardTeacherSolid />
      }

    ]
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Reports',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 2',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 3',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Message 1',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Message 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];
