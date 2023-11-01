// const date = new Date(Math.floor(Math.random() * 5) + 2019,Math.floor(Math.random() * 12) + 1,Math.floor(Math.random() * 29) +1)

const date1 = () => {
  return new Date(Math.floor(Math.random() * 5) + 2020,Math.floor(Math.random() * 12) + 1,Math.floor(Math.random() * 29) +1)
}
const date2 = () => {
  return new Date(2023,Math.floor(Math.random() * 10) + 1,Math.floor(Math.random() * 29) +1)
}
const date3 = () => {
  return new Date(2024,Math.floor(Math.random() * 12) + 1,Math.floor(Math.random() * 29) +1)
}
const date_NgaySinh = () => {
  return new Date(Math.floor(Math.random() * 20) + 1970,Math.floor(Math.random() * 12) + 1,Math.floor(Math.random() * 29) +1)
}

const random_sdt = () => {
  return "0951753"+(Math.floor(Math.random() * 899)+100);
}
const random_email = () => {

  let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let max = Math.floor(Math.random() * 4)+6;
    let counter = 0;
    while (counter < max) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result+'@gmail.com';

}
const full_name = [
  'Nguyễn Văn Bảo', 'Nguyễn Thị Hà', 'Nguyễn Văn Cỗi', 'Trần Văn Bình', 'Trần Văn Ba',
  'Trần Thị Hiền', 'Lê Đức Thọ', 'Lê Bảo Bình', 'Phạm Công Thành', 'Chương Thị Hảo',
  'Võ Tắc Chí', 'Vũ Thị Mai', 'Vũ Thị Chung','Nguyễn Chiến Thắng', 'Nguyễn Thái Học',
  'Trần Văn Học', 'Vũ Thị Thái', 'Lê Chung Kiên', 'Nguyễn Văn Chung', 'Võ Thị Hằng',
  'Trần Thị Kiều', 'Vũ Trần Thái Nguyên', 'Lê Văn Nguyên', 'Nguyễn Văn Thái', 'Võ Thị Trúc',
]
const random_fullName = () => {
  return full_name[Math.floor(Math.random()*full_name.length)]
}
//
const random_HocVi = () => {
  let a = Math.floor(Math.random()*2);
  if (a === 1)
    return 'Tiến sĩ'
  return "Thạc sĩ"
}

const dataKhuVuc = [
  { id: 1, name: "Tòa nhaa A", soTang: 5 },
  { id: 2, name: "Tòa nhà B", soTang: 2 },
  { id: 3, name: "Tòa nhà C", soTang: 4 },
  { id: 3, name: "Tòa nhà C", soTang: 4 },
  { id: 3, name: "Tòa nhà C", soTang: 4 },
  { id: 3, name: "Tòa nhà C", soTang: 4 },
  { id: 3, name: "Tòa nhà C", soTang: 4 },
  { id: 3, name: "Tòa nhà C", soTang: 4 },
  { id: 3, name: "Tòa nhà C", soTang: 4 },
  { id: 3, name: "Tòa nhà C", soTang: 4 },
  { id: 4, name: "Tòa nhà D", soTang: 5 },
];

/**
 *  status: 1-"Đang-sử dụng", 0 - "Phòng-trống", -1 - "Đang-bảo trì"
 */
const dataPhongMay = [
  {
    id: 1,
    roomCode: "H3.1",
    numberOfMachines: 40,
    description: "Phòng máy H3.1",
    soThietBi:3,
    soPhanMem:5,
    status: 1,
  },
  {
    id: 2,
    roomCode: "H4.1",
    numberOfMachines: 50,
    description: "Phòng máy H4.1",
    soThietBi:3,
    soPhanMem:5,
    status: 0,
  },
  {
    id: 3,
    roomCode: "H4.2",
    numberOfMachines: 45,
    description: "Phòng máy H4.2",
    soThietBi:3,
    soPhanMem:5,
    status: 1,
  },
  {
    id: 4,
    roomCode: "H5.1",
    numberOfMachines: 55,
    description: "Phòng máy H5.1",
    soThietBi:3,
    soPhanMem:5,
    status: 0,
  },
  {
    id: 5,
    roomCode: "H5.2",
    numberOfMachines: 33,
    description: "Phòng máy H5.2",
    soThietBi:3,
    soPhanMem:5,
    status: -1,
  },
  {
    id: 6,
    roomCode: "H6.1",
    numberOfMachines: 42,
    description: "Phòng máy H6.1",
    soThietBi:3,
    soPhanMem:5,
    status: 1,
  },
  {
    id: 7,
    roomCode: "H7.1",
    numberOfMachines: 37,
    description: "Phòng máy H7.1",
    soThietBi:3,
    soPhanMem:5,
    status: -1,
  },
  {
    id: 8,
    roomCode: "H8.1",
    numberOfMachines: 58,
    description: "Phòng máy H8.1",
    soThietBi:3,
    soPhanMem:5,
    status: 0,
  },
  {
    id: 9,
    roomCode: "H9.2",
    numberOfMachines: 43,
    description: "Phòng máy H9.1",
    soThietBi:3,
    soPhanMem:5,
    status: 1,
  },
  {
    id: 10,
    roomCode: "H9.1",
    numberOfMachines: 46,
    description: "Phòng máy H9.2",
    soThietBi:3,
    soPhanMem:5,
    status: 0,
  },
];

const dataTang = [
  { id: 1, name: "Tầng 1", soPhong: 5 },
  { id: 2, name: "Tầng 2", soPhong: 2 },
  { id: 3, name: "Tầng 3", soPhong: 5 },
  { id: 4, name: "Tầng 4", soPhong: 6 },
];

const random1_0 = () => {
  let x = Math.floor(Math.random() * 10);
  if (x === 2|| x === 6 || x === 7) {
    return 0
  }
  return 1
}
//8.	Thiết bị (mã thiết bị, tên thiết bị, trạng thái, ngày cài đặt, tuổi thọ)
const dataThietBi = [
  {id:1, idCode:"TBi001", name:'chuột HP', status:random1_0(), ngaySuDung: date1()+"", tuoiTho:36 },
  {id:2, idCode:"TBi002", name:'Man hinh A', status:random1_0(), ngaySuDung: date2()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:3, idCode:"TBi003", name:'CPU 123', status:random1_0(), ngaySuDung: date3()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:4, idCode:"TBi004", name:'SSD-1TB', status:random1_0(), ngaySuDung: date1()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:5, idCode:"TBi005", name:'RAM Kingston 8GB ', status:random1_0(), ngaySuDung: date3()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:6, idCode:"TBi006", name:'RAM PC Fury', status:random1_0(), ngaySuDung: date2()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:7, idCode:"TBi007", name:'SSD Kingston XS1000', status:random1_0(), ngaySuDung: date2()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:8, idCode:"TBi008", name:'Card GeForce GT 1030', status:random1_0(), ngaySuDung: date1()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:9, idCode:"TBi009", name:' SSD/HDD Orico 25PW1-U3-BK', status:random1_0(), ngaySuDung: date1()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:10, idCode:"TBi010", name:'CORE - 1', status:random1_0(), ngaySuDung: date2()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:11, idCode:"TBi011", name:'CORE - 1', status:random1_0(), ngaySuDung: date1()+"", tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:12, idCode:"TBi012", name:'CORE - 1', status:random1_0(), ngaySuDung: 'Tue Oct 28 2021 16:38:31 GMT+0700 (GMT+07:00)', tuoiTho:24 },
]

let arrPhongMay1 = [
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
]
let arrPhongMay2 = [
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
  dataPhongMay[Math.floor(Math.random() * dataPhongMay.length)], 
]


// 5.	Môn học (mã môn, tên môn , ngày bắt đầu môn, ngày kết thúc môn - so tuần)
const dataMonHoc = [
  {idCode:'MH001', name:'Lập trình www.', ngayBatDau: date1()+"", soBuoi:20 },
  {idCode:'MH002', name:'Lập trình java cơ bản', ngayBatDau: date3()+"", soBuoi:15 },
  {idCode:'MH003', name:'Mạng máy tính', ngayBatDau: date2()+"", soBuoi:15 },
  {idCode:'MH004', name:'Nhập môn lập trình', ngayBatDau: date2()+"", soBuoi:20 },
  {idCode:'MH005', name:'Lập trình hướng đối tượng', ngayBatDau: date3()+"", soBuoi:15 },
  {idCode:'MH006', name:'Lập trình hướng sự kiện.', ngayBatDau: date2()+"", soBuoi:13 },
  {idCode:'MH007', name:'Hệ cơ sở dữ liệu', ngayBatDau: date3()+"", soBuoi:15 },
  {idCode:'MH008', name:'Hệ thống máy tính', ngayBatDau: date3()+"", soBuoi:13 },
  {idCode:'MH009', name:'Hệ thống máy tính', ngayBatDau: date1()+"", soBuoi:13 },
]
const arrMonhoc1= [
  dataMonHoc[Math.floor(Math.random() * dataMonHoc.length)],
  dataMonHoc[Math.floor(Math.random() * dataMonHoc.length)],
  dataMonHoc[Math.floor(Math.random() * dataMonHoc.length)],
  dataMonHoc[Math.floor(Math.random() * dataMonHoc.length)],
]
const arrMonhoc2= [
  dataMonHoc[Math.floor(Math.random() * dataMonHoc.length)],
  dataMonHoc[Math.floor(Math.random() * dataMonHoc.length)],
  dataMonHoc[Math.floor(Math.random() * dataMonHoc.length)],
  dataMonHoc[Math.floor(Math.random() * dataMonHoc.length)],
  dataMonHoc[Math.floor(Math.random() * dataMonHoc.length)],
]
//4.	Phần mềm (mã phần mềm, tên phần mềm, trạng thái, ngay bd, tuoitho  )
const dataPhanMem = [
  {id:1, idCode:'PM001', name:'mySQL Server 2019', mota:'MySQL là hệ quản trị cơ sở dữ liệu tự do nguồn mở phổ biến nhất thế giới và được các nhà phát triển rất ưa chuộng trong quá trình phát triển ứng dụng.', status:1, arrPhongMay: arrPhongMay1, arrMonhoc:arrMonhoc2, ngaySuDung:date1(),tuoiTho:Math.floor(Math.random() * 24) + 12  },
  {id:2, idCode:'PM002', name:'mySQL 2019', mota:'MySQL là hệ quản trị cơ sở dữ liệu tự do nguồn mở phổ biến nhất thế giới và được các nhà phát triển rất ưa chuộng trong quá trình phát triển ứng dụng.', status:1, arrPhongMay: arrPhongMay2, arrMonhoc:arrMonhoc2, ngaySuDung:date1(),tuoiTho:Math.floor(Math.random() * 24) + 12  },
  {id:3, idCode:'PM003', name:'mariadb 2020', mota:'MySQL là hệ quản trị cơ sở dữ liệu tự do nguồn mở phổ biến nhất thế giới và được các nhà phát triển rất ưa chuộng trong quá trình phát triển ứng dụng.', status:1, arrPhongMay: arrPhongMay1, arrMonhoc:arrMonhoc1, ngaySuDung:date1(),tuoiTho:Math.floor(Math.random() * 24) + 12  },
  {id:4, idCode:'PM004', name:'eclipse 2023', mota:'MySQL là hệ quản trị cơ sở dữ liệu tự do nguồn mở phổ biến nhất thế giới và được các nhà phát triển rất ưa chuộng trong quá trình phát triển ứng dụng.', status:1, arrPhongMay: arrPhongMay2, arrMonhoc:arrMonhoc1, ngaySuDung:date1(),tuoiTho:Math.floor(Math.random() * 24) + 12  },
  {id:5, idCode:'PM005', name:'Node js', mota:'MySQL là hệ quản trị cơ sở dữ liệu tự do nguồn mở phổ biến nhất thế giới và được các nhà phát triển rất ưa chuộng trong quá trình phát triển ứng dụng.', status:1, arrPhongMay: arrPhongMay1, arrMonhoc:arrMonhoc1 , ngaySuDung:date1(),tuoiTho:Math.floor(Math.random() * 24) + 12  },
  {id:6, idCode:'PM006', name:'Python 2.0', mota:'MySQL là hệ quản trị cơ sở dữ liệu tự do nguồn mở phổ biến nhất thế giới và được các nhà phát triển rất ưa chuộng trong quá trình phát triển ứng dụng.', status:1, arrPhongMay: arrPhongMay2, arrMonhoc:arrMonhoc2 , ngaySuDung:new Date(2021,10,2),tuoiTho:24  },
]

//
const dataNhanVien = [
  {id:1, idCode:'NV0001', name:random_fullName(), ngaySinh: date_NgaySinh()+"", sdt:random_sdt(), email:random_email() },
  {id:2, idCode:'NV0002', name:random_fullName(), ngaySinh: date_NgaySinh()+"", sdt:random_sdt(), email:random_email() },
  {id:3, idCode:'NV0003', name:random_fullName(), ngaySinh: date_NgaySinh()+"", sdt:random_sdt(), email:random_email() },
  {id:4, idCode:'NV0004', name:random_fullName(), ngaySinh: date_NgaySinh()+"", sdt:random_sdt(), email:random_email() },
  {id:5, idCode:'NV0005', name:random_fullName(), ngaySinh: date_NgaySinh()+"", sdt:random_sdt(), email:random_email() },
  {id:6, idCode:'NV0006', name:random_fullName(), ngaySinh: date_NgaySinh()+"", sdt:random_sdt(), email:random_email() },
  {id:7, idCode:'NV0007', name:random_fullName(), ngaySinh: date_NgaySinh()+"", sdt:random_sdt(), email:random_email() },
  {id:8, idCode:'NV0008', name:random_fullName(), ngaySinh: date_NgaySinh()+"", sdt:random_sdt(), email:random_email() },
  {id:9, idCode:'NV0009', name:random_fullName(), ngaySinh: date_NgaySinh()+"", sdt:random_sdt(), email:random_email() },
]
//
const random_TenKhoa = () => {
  let nameKhoa=[
    'Công nghệ thông tin','Kỹ thuật phần mềm','Hệ thống thông tin','Khoa học máy tính','Trí tuệ nhân tạo',
  ]
  let a = Math.floor(Math.random()*4);
  return nameKhoa[a]
}
// 
const dataGiaoVien = [
  {id:1, idCode:'GV0001', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:'Công nghệ thông tin', sdt:random_sdt(), email:random_email(), chucVu:'Trưởng Khoa', hocVi:'Giáo sư' },
  {id:2, idCode:'GV0002', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:'Kỹ thuật phần mềm', sdt:random_sdt(), email:random_email(), chucVu:'Trưởng Khoa', hocVi:'Giáo sư' },
  {id:3, idCode:'GV0003', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:'Hệ thống thông tin', sdt:random_sdt(), email:random_email(), chucVu:'Trưởng Khoa', hocVi:'Giáo sư' },
  {id:4, idCode:'GV0004', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:'Khoa học máy tính', sdt:random_sdt(), email:random_email(), chucVu:'Trưởng Khoa', hocVi:'Giáo sư' },
  {id:5, idCode:'GV0005', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:'Trí tuệ nhân tạo', sdt:random_sdt(), email:random_email(), chucVu:'Trưởng Khoa', hocVi:'Giáo sư' },
  {id:6, idCode:'GV0006', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:random_TenKhoa(), sdt:random_sdt(), email:random_email(), chucVu:'', hocVi:random_HocVi()},
  {id:7, idCode:'GV0007', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:random_TenKhoa(), sdt:random_sdt(), email:random_email(), chucVu:'Phó Khoa', hocVi:random_HocVi()},
  {id:8, idCode:'GV0008', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:random_TenKhoa(), sdt:random_sdt(), email:random_email(), chucVu:'', hocVi:random_HocVi()},
  {id:9, idCode:'GV0009', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:random_TenKhoa(), sdt:random_sdt(), email:random_email(), chucVu:'Phó Khoa', hocVi:random_HocVi()},
  {id:10, idCode:'GV0010', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:random_TenKhoa(), sdt:random_sdt(), email:random_email(), chucVu:'', hocVi:random_HocVi()},
  {id:11, idCode:'GV0011', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:random_TenKhoa(), sdt:random_sdt(), email:random_email(), chucVu:'', hocVi:random_HocVi()},
  {id:12, idCode:'GV0012', name: random_fullName(), ngaySinh:date_NgaySinh()+'Phó Khoa', tenKhoa:random_TenKhoa(), sdt:random_sdt(), email:random_email(), chucVu:'', hocVi:random_HocVi()},
  {id:13, idCode:'GV0013', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:random_TenKhoa(), sdt:random_sdt(), email:random_email(), chucVu:'', hocVi:random_HocVi()},
  {id:14, idCode:'GV0014', name: random_fullName(), ngaySinh:date_NgaySinh()+'', tenKhoa:random_TenKhoa(), sdt:random_sdt(), email:random_email(), chucVu:'', hocVi:random_HocVi()},
]
// console.log("🚀 ~ file: Database.js:286 ~ dataGiaoVien:", dataGiaoVien)

//
const dataKhoa = [
  {id:1, idCode:'KH0001', name:'Công nghệ thông tin', soGiaoVien:Math.floor(Math.random()*10)+10,truongKhoa:dataGiaoVien[0]},
  {id:2, idCode:'KH0002', name:'Kỹ thuật phần mềm', soGiaoVien:Math.floor(Math.random()*10)+10,truongKhoa:dataGiaoVien[1]},
  {id:3, idCode:'KH0003', name:'Hệ thống thông tin', soGiaoVien:Math.floor(Math.random()*10)+10,truongKhoa:dataGiaoVien[2]},
  {id:4, idCode:'KH0004', name:'Khoa học máy tính', soGiaoVien:Math.floor(Math.random()*10)+10,truongKhoa:dataGiaoVien[3]},
  {id:5, idCode:'KH0005', name:'Trí tuệ nhân tạo', soGiaoVien:Math.floor(Math.random()*10)+10,truongKhoa:dataGiaoVien[4]},
]
// console.log("🚀 ~ file: Database.js:262 ~ dataKhoa:", dataKhoa)
const dataQuyen = [
  {id:1, idCode:'QN0001', mota:'Giáo viên'},
  {id:2, idCode:'QN0002', mota:'Nhân viên hệ thống'},
  {id:3, idCode:'QN0003', mota:'Nhân viên bảo trì'},
  {id:4, idCode:'QN0004', mota:'Nhân viên Quản lý'},
]
const random_quyen = (val) => {
  let a = Math.floor(Math.random()*8)+1;
  if (val === 0) {
    return dataQuyen[0].idCode;
  }
  if (a % 3 === 0) {
    return dataQuyen[3].idCode;
  }
  else if (a%3 === 1) {
      return dataQuyen[1].idCode;
  }
  else if (a%3 === 2) {
      return dataQuyen[2].idCode;
  }
return a
}
const random_username = () => {

    let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let max = Math.floor(Math.random() * 4)+8;
      let counter = 0;
      while (counter < max) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  
}

// 
const random_GV = () => {
  let a = Math.floor(Math.random()*dataGiaoVien.length);
  return dataGiaoVien[a];
}
const random_NV = () => {
  let a = Math.floor(Math.random()*dataNhanVien.length);
  return dataNhanVien[a];
}

//
const dataTaiKhoan = [
  {id:1, idCode:'TK0001', userName:random_username(), password:'11111111', mota: random_GV(), quyenId: random_quyen(0) },
  {id:2, idCode:'TK0002', userName:random_username(), password:'11111111', mota: random_NV(), quyenId: random_quyen() },
  {id:3, idCode:'TK0003', userName:random_username(), password:'11111111', mota: random_NV(), quyenId: random_quyen() },
  {id:4, idCode:'TK0004', userName:random_username(), password:'11111111', mota: random_NV(), quyenId: random_quyen() },
  {id:5, idCode:'TK0005', userName:random_username(), password:'11111111', mota: random_GV(), quyenId: random_quyen(0) },
  {id:6, idCode:'TK0006', userName:random_username(), password:'11111111', mota: random_NV(), quyenId: random_quyen() },
  {id:7, idCode:'TK0007', userName:random_username(), password:'11111111', mota: random_GV(), quyenId: random_quyen(0) },
  {id:8, idCode:'TK0008', userName:random_username(), password:'11111111', mota: random_NV(), quyenId: random_quyen() },
  {id:9, idCode:'TK0009', userName:random_username(), password:'11111111', mota: random_GV(), quyenId: random_quyen(0) },
]

const datalichTruc = [
  {
    maLich: 1,
    tgian: "2023-10-30T17:00:00.000+00:00",
    thoiGianBatDau: 6,
    thoiGianKetThuc: 14,
    soNgayNghi: 0,
    nhanVien: {
      maNV: "NV003",
      tenNV: "Nhân văn Viên 3",
      email: "email3@example.com",
      sDT: "0951753002",
      chucVu: {
        maCV: 2,
        tenCV: "Nhân viên hỗ trợ",
      },
    },
    tang: {
      maTang: 2,
      tenTang: "Tầng 2",
    },
  },
  {
    maLich: 2,
    tgian: "2023-10-30T17:00:00.000+00:00",
    thoiGianBatDau: 14,
    thoiGianKetThuc: 22,
    soNgayNghi: 5,
    nhanVien: {
      maNV: "NV004",
      tenNV: "Nhân văn Viên 4",
      email: "email4@example.com",
      sDT: "0951753004",
      chucVu: {
        maCV: 2,
        tenCV: "Nhân viên hỗ trợ",
      },
    },
    tang: {
      maTang: 3,
      tenTang: "Tầng 1",
    },
  },
];





export default { 
  dataKhuVuc,
  dataPhongMay,
  dataTang,
  dataThietBi,
  dataPhanMem,
  dataMonHoc, 
  dataNhanVien, 
  dataGiaoVien, 
  dataKhoa,
  dataTaiKhoan,
  dataQuyen,
  datalichTruc,
};
