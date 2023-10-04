// const date = new Date(Math.floor(Math.random() * 5) + 2019,Math.floor(Math.random() * 12) + 1,Math.floor(Math.random() * 29) +1)

const date1 = () => {
  return new Date(Math.floor(Math.random() * 5) + 2019,Math.floor(Math.random() * 12) + 1,Math.floor(Math.random() * 29) +1)
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

//8.	Thiết bị (mã thiết bị, tên thiết bị, trạng thái, ngày cài đặt, tuổi thọ)
const dataThietBi = [
  {id:1, idCode:"TBi001", name:'chuột HP', status:1, ngaySuDung: date1, tuoiTho:36 },
  {id:2, idCode:"TBi002", name:'Man hinh A', status:1, ngaySuDung: date1, tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:3, idCode:"TBi003", name:'CPU 123', status:1, ngaySuDung: date1, tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:4, idCode:"TBi004", name:'SSD-1TB', status:1, ngaySuDung: date1, tuoiTho:Math.floor(Math.random() * 24) + 12 },
  {id:5, idCode:"TBi005", name:'CORE - 1', status:1, ngaySuDung: date1, tuoiTho:Math.floor(Math.random() * 24) + 12 },
]

//4.	Phần mềm (mã phần mềm, tên phần mềm, trạng thái, ngay bd, tuoitho  )

const dataPhanMem = [
  {id:1, idCode:'PM001', name:'mySQL Server 2019', status:1, ngaySuDung:date1,tuoiTho:Math.floor(Math.random() * 24) + 12  },
  {id:2, idCode:'PM002', name:'mySQL 2019', status:1, ngaySuDung:date1,tuoiTho:Math.floor(Math.random() * 24) + 12  },
  {id:3, idCode:'PM003', name:'mariadb 2020', status:1, ngaySuDung:date1,tuoiTho:Math.floor(Math.random() * 24) + 12  },
  {id:4, idCode:'PM004', name:'eclipse 2023', status:1, ngaySuDung:date1,tuoiTho:Math.floor(Math.random() * 24) + 12  },
  {id:5, idCode:'PM005', name:'Node js', status:1, ngaySuDung:date1,tuoiTho:Math.floor(Math.random() * 24) + 12  },
]

export default { dataKhuVuc,dataPhongMay,dataTang,dataThietBi,dataPhanMem };
